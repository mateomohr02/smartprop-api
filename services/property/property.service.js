const {
  Property,
  PropertyRooms,
  PropertyType,
  City,
  Neighborhood,
  User,
} = require("../../db/models");
const AppError = require("../../utils/appError");
const { nameFormatter, slugFormatter } = require("../../utils/stringFormatter");
const { fetchandCreateCharacteristics } = require("./characteristic.service");
const { fetchOrCreatePropertyType } = require("./propertyType.service");
const { fetchOrCreatePlace } = require("../places/places.service");
const { addPropertyOtherRooms } = require("./rooms.service");
const { addPropertyComodities } = require("./comodities.service");
const { nanoid } = require("nanoid");

const addProperty = async (
  {
    title,
    price,
    priceFIAT,
    expenses = 0,
    expensesFIAT = "ARS",
    operation,
    financing = null,
    propertyTypeSlug,
    address,
    mapLocation,
    description,
    multimedia,
    surface,
    services,
    condition,
    age,
    availabilityType,
    availabilityDate = new Date(),
    place,
    rooms = 0,
    bedrooms = 0,
    bathrooms = 0,
    otherRooms = [],
    comodities,
    characteristics,
  },
  tenant
) => {
  if (
    !title ||
    !price ||
    !priceFIAT ||
    !operation ||
    !propertyTypeSlug ||
    !description ||
    !address ||
    !mapLocation ||
    !multimedia ||
    !place ||
    !surface ||
    !condition ||
    !age ||
    !availabilityType ||
    !tenant?.id
  ) {
    throw new AppError("Missing parameters to create a Property", 400);
  }

  const shortId = nanoid(6);
  let addedPropertyComodities = [];
  let addedPropertyRooms = [];
  let addedPropertyCharacteristics = [];
  let addedPropertyType;

  if (characteristics) {
    //Example: Characteristics = [characteristic1Slug, characteristic2Slug, newCharacteristicName1, characteristic3Slug]
    addedPropertyCharacteristics = await fetchandCreateCharacteristics(
      characteristics,
      tenant.id
    );
  }

  if (propertyTypeSlug) {
    addedPropertyType = await fetchOrCreatePropertyType(
      propertyTypeSlug,
      tenant.id
    );
  }

  const { countryId, provinceId, city, neighborhood } =
    await fetchOrCreatePlace(place);

  const propertySlug = slugFormatter(
    `${
      operation === "sale"
        ? "venta"
        : operation === "rent"
        ? "alquiler"
        : "short-term"
    } ${title} ${rooms} "ambientes" ${address} "en" ${city.name} ${
      neighborhood.name
    } ${price} ${priceFIAT} ${tenant.name} ${shortId}`
  );

  const formattedProppertyTitle = nameFormatter(title);

  const newProp = await Property.create({
    title: formattedProppertyTitle,
    price,
    priceFIAT,
    slug: propertySlug,
    expenses,
    expensesFIAT,
    financing,
    operation,
    propertyTypeId: addedPropertyType,
    address,
    mapLocation,
    description,
    multimedia,
    surface,
    condition,
    age,
    services,
    availabilityType,
    availabilityDate,
    countryId,
    provinceId,
    rooms,
    bedrooms,
    bathrooms,
    cityId: city.id,
    neighborhoodId: neighborhood.id,
    tenantId: tenant.id,
  });

  if (!newProp) {
    throw new AppError("Error while creating the property", 404);
  }

  if (otherRooms.length > 0) {
    addedPropertyRooms = await addPropertyOtherRooms(
      otherRooms,
      newProp.id,
      tenant.id
    );
  }

  if (comodities.length > 0) {
    addedPropertyComodities = await addPropertyComodities(
      comodities,
      newProp.id,
      tenant.id
    );
  }

  return { newProp, addedPropertyRooms, addedPropertyComodities };
};

const fetchPropertiesTenantId = async (limit, page, offset, tenantId) => {
  if (
    [limit, page, offset].some((val) => typeof val !== "number") ||
    !tenantId
  ) {
    throw new AppError(
      "Any of the required parameters to fetch properties is missing.",
      401
    );
  }

  const props = await Property.findAndCountAll({
    where: {
      tenantId,
    },
    limit,
    offset,
    attributes: [
      "id",
      "title",
      "slug",
      "price",
      "priceFIAT",
      "expenses",
      "expensesFIAT",
      "surface",
      "rooms",
      "bedrooms",
      "bathrooms",
      "multimedia",
      "operation",
      "visualizations",
    ],
    include: [
      {
        model: PropertyType,
        attributes: ["name"],
      },
      {
        model: City,
        attributes: ["name"],
      },
      {
        model: Neighborhood,
        attributes: ["name"],
      },
    ],
  });

  return props;
};

const toggleIsActiveProperty = async (propertyId, tenantId, userId) => {
  if (!propertyId || !tenantId || !userId) {
    throw new AppError("Missing parameters.", 400);
  }

  const property = await Property.findOne({
    where: {
      id: propertyId,
      tenantId,
    },
  });

  if (!property) {
    throw new AppError("Property Not Found.", 404);
  }

  const user = await User.findOne({
    where: {
      id: userId,
      tenantId,
    },
  });

  if (!user || !user.isValidated) {
    throw new AppError("User not found or unalowed.", 403);
  }

  property.isActive = !property.isActive;

  await property.save();

  return property;
};

const fetchFilteredProperties = async (filter = {}, tenantId) => {
  const properties = await Property.findAll({
    where: {
      tenantId,
      isActive: true,
    },
  });
};

module.exports = {
  addProperty,
  fetchPropertiesTenantId,
  toggleIsActiveProperty,
};
