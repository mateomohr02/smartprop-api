const {
  Property,
  Features,
  PropertyType,
  City,
  Neighborhood,
  User
} = require("../../db/models");
const AppError = require("../../utils/appError");
const { nameFormatter, slugFormatter } = require("../../utils/stringFormatter");
const { fetchandCreateCharacteristics } = require("./characteristic.service");
const { fetchOrCreatePropertyType } = require("./propertyType.service");
const { fetchOrCreatePlace } = require("../places/places.service");
const { addPropertyRooms } = require("./propertyRooms.service");
const { addPropertyComodities } = require("./propertyComodities.service");
const { nanoid } = require("nanoid");



const addProperty = async (
  {
    title, price, priceFIAT, expenses, expensesFIAT, financing,
    operation, propertyType, address, mapLocation, description,
    multimedia, surface, condition, age, availabilityType, services,
    availabilityDate, place, characteristics, propertyRooms, propertyComodities
  },
  tenant
) => {
  if (
    !characteristics || !propertyComodities || !propertyRooms || !propertyType ||
    !title ||  !description || !address || !mapLocation ||  !multimedia || !place ||
    !priceFIAT || !price || 
    !operation ||   
    !surface ||
    !condition || !age ||
    !availabilityType ||
    !tenant.id
  ) {
    throw new AppError("Missing parameters to create a Property", 400);
  }

  //Example: Characteristics = [characteristic1Slug, characteristic2Slug, newCharacteristicName1, characteristic3Slug]
  const characteristicsIds = await fetchandCreateCharacteristics(
    characteristics,
    tenant.id
  );
  //Example = CharacteristicsIds = ['1', '2', '4', '3']
  //Example: PropertyType = "casa":slug
  //         PropertyType = "casa quinta":name : nuevoRegistro
  //         Se guarda como: "Casa Quinta" retorna id del nuevo registro
  const propertyTypeId = await fetchOrCreatePropertyType(
    propertyType,
    tenant.id
  );

  //Example = PropertyTypeId = 1
  if (!characteristicsIds.length || !propertyTypeId) {
    throw new AppError(
      "Error while trying to add Characteristics or the Property Type",
      400
    );
  }

  //Place:
  //{
  // countryInput:'argentina', ->slug
  // provinceInput: 'cordoba', ->slug
  // cityInput: 'cordoba' ->slug
  // neighborhoodInput: 'URCA' ->name ingresado por el usuario
  //}
  const { countryId, provinceId, city, neighborhood } =
    await fetchOrCreatePlace(place);

  //Recibe IDs correpondientes

  const shortId = nanoid(6);

  const propertySlug = slugFormatter(`${operation === 'sale' ? "venta" : operation === 'rent' ? 'alquiler' : 'short-term'} ${title} ${propertyRooms.rooms} "ambientes" ${address} "en" ${city.name} ${neighborhood.name} ${price} ${priceFIAT} ${tenant.name} ${shortId}`)

  const formattedProppertyTitle = nameFormatter(title);

  const financingProp = financing || null;

  const finalAvailabilityDate = availabilityDate || new Date();

  const newProp = await Property.create({
    title: formattedProppertyTitle,
    price,
    priceFIAT,
    slug: propertySlug,
    expenses,
    expensesFIAT,
    financing: financingProp,
    operation,
    propertyTypeId,
    address,
    mapLocation,
    description,
    multimedia,
    surface,
    condition,
    age,
    services,
    availabilityType,
    finalAvailabilityDate,
    countryId,
    provinceId,
    cityId: city.id,
    neighborhoodId: neighborhood.id,
    tenantId: tenant.id,
  });

  if (!newProp) {
    throw new AppError("Error while creating the property", 404);
  }

  //CREAMOS EL DATO DE LOS AMBIENTES DE LA PROPIEDAD
  //FEATURE:
  //rooms N
  //bedrooms N
  //bathrooms N
  //toilettes N
  //garage N
  //balcony m2
  //meetingsRoom SUM EDIFICIOS T/F
  //pool T/F
  //laundryRoom T/F
  //roofTop TERRAZA T/F
  //kitchen T/F

  const addedPropertyRooms = await addPropertyRooms(propertyRooms, newProp.id, tenant.id);
  const addedPropertyComodities = await addPropertyComodities(propertyComodities, newProp.id, tenant.id)


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
      tenantId:tenantId
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
      "multimedia",
      "operation",
      "visualizations",
    ],
    include: [
      {
        model: Features,
      },
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
      id:userId,
      tenantId
    }
  })

  if (!user || !user.isValidated) {
    throw new AppError("User not found or unalowed.", 403);
  }

  property.isActive = !property.isActive;

  await property.save();

  return property;

};

module.exports = {
  addProperty,
  fetchPropertiesTenantId,
  toggleIsActiveProperty,
};
