const {
  Property,
  PropertyComodity,
  PropertyRoom,
  PropertyCharacteristic,
  Room,
  Comodity,
  Characteristic,
  Country,
  Province,
  City,
  Neighborhood,
  PropertyType,
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
    garages = 0,
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
    garages,
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

  if (characteristics.length > 0) {
    addedPropertyCharacteristics = await fetchandCreateCharacteristics(
      characteristics,
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
      isActive: true,
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

const searchPropertiesService = async (filters, tenantId) => {
  const where = {};
  const include = [];

  // Filtros directos
  if (filters.operation) where.operation = filters.operation;
  if (filters.city)
    include.push({ model: City, where: { slug: filters.city } });
  if (filters.neighborhood)
    include.push({
      model: Neighborhood,
      where: { slug: filters.neighborhood },
    });
  if (filters.minBathrooms)
    where.bathrooms = { [Op.gte]: filters.minBathrooms };
  if (filters.minGarages) where.garages = { [Op.gte]: filters.minGarages };
  if (filters.minBedrooms) where.bedrooms = { [Op.gte]: filters.minBedrooms };
  if (filters.maxBedrooms)
    where.bedrooms = {
      ...(where.bedrooms || {}),
      [Op.lte]: filters.maxBedrooms,
    };
  if (filters.minAmbientes) where.rooms = { [Op.gte]: filters.minAmbientes };
  if (filters.maxAmbientes)
    where.rooms = { ...(where.rooms || {}), [Op.lte]: filters.maxAmbientes };

  // Filtros por comodities
  if (filters.comodities?.length > 0) {
    include.push({
      model: Comodity,
      where: { slug: { [Op.in]: filters.comodities, tenantId } },
      through: { attributes: [] },
    });
  }

  // Filtros por rooms
  if (filters.rooms?.length > 0) {
    include.push({
      model: Room,
      where: { slug: { [Op.in]: filters.rooms, tenantId } },
      through: { attributes: [] },
    });
  }

  // Filtros por características
  if (filters.characteristics?.length > 0) {
    include.push({
      model: Characteristic,
      where: { slug: { [Op.in]: filters.characteristics, tenantId } },
      through: { attributes: [] },
    });
  }

  // Filtros por tipo de propiedad
  if (filters.propertyTypes?.length > 0) {
    include.push({
      model: PropertyType,
      where: { slug: { [Op.in]: filters.propertyTypes, tenantId } },
    });
  }

  const properties = await Property.findAll({
    where,
    include,
  });

  return properties;
};

const getFiltersForTenantService = async (tenantId) => {
  const [
    availablePropertyTypes,
    availableComodities,
    availableRooms,
    availableCharacteristics,
    properties,
  ] = await Promise.all([
    PropertyType.findAll({ where: { tenantId } }),
    Comodity.findAll({ where: { tenantId } }),
    Room.findAll({ where: { tenantId } }),
    Characteristic.findAll({ where: { tenantId } }),
    Property.findAll({
      where: { tenantId, isActive: true },
      attributes: ["countryId", "provinceId", "cityId", "neighborhoodId"],
      raw: true,
    }),
  ]);
  const uniqueCountryIds = [...new Set(properties.map((p) => p.countryId))];
  const uniqueProvinceIds = [...new Set(properties.map((p) => p.provinceId))];
  const uniqueCityIds = [...new Set(properties.map((p) => p.cityId))];
  const uniqueNeighborhoodIds = [
    ...new Set(properties.map((p) => p.neighborhoodId)),
  ];

  const [countries, provinces, cities, neighborhoods] = await Promise.all([
    Country.findAll({
      where: { id: uniqueCountryIds },
    }),
    Province.findAll({
      where: { id: uniqueProvinceIds },
    }),
    City.findAll({
      where: { id: uniqueCityIds },
    }),
    Neighborhood.findAll({
      where: { id: uniqueNeighborhoodIds },
    }),
  ]);

  return {
    availablePropertyTypes,
    availableComodities,
    availableRooms,
    availableCharacteristics,
    countries,
    provinces,
    cities,
    neighborhoods,
  };
};

const fetchPropertiesSlugs = async (tenantId) => {
  let slugs = [];

  slugs = await Property.findAll({
    where: {
      tenantId,
      isActive: true,
    },
    attributes: ["slug"],
  });

  return slugs;
};

const fetchActiveProperties = async (tenantId) => {
  const properties = await Property.findAll({
    where: {
      tenantId,
      isActive: true,
    },
    attributes: [
      "id",
      "slug",
      "title",
      "price",
      "priceFIAT",
      "expenses",
      "expensesFIAT",
      "surface",
      "rooms",
      "bedrooms",
      "bathrooms",
      "garages",
      "multimedia",
    ],
    include: [
      {
        model: PropertyType,
        attributes: ["name", "slug"],
      },
      {
        model: City,
        attributes: ["name", "slug"],
      },
      {
        model: Neighborhood,
        attributes: ["name", "slug"],
      },
    ],
  });

  return properties;
};

const getPropertyDetailService = async (propertySlug, tenantId) => {
  if (!tenantId || !propertySlug) return {};

  const prop = await Property.findOne({
    where: { slug: propertySlug, tenantId },
    include: [
      { model: PropertyType, attributes: ["name"] },
      { model: City, attributes: ["name"] },
      { model: Neighborhood, attributes: ["name"] },
      {
        model: Comodity,
        through: { attributes: [] },
        attributes: ["name"],
      },
      {
        model: Characteristic,
        through: { attributes: [] },
        attributes: ["name"],
      },
      {
        model: Room,
        through: { attributes: [] },
        attributes: ["name"],
      },
    ],
  });

  return prop;
};

module.exports = {
  addProperty,
  fetchPropertiesTenantId,
  toggleIsActiveProperty,
  searchPropertiesService,
  getFiltersForTenantService,
  fetchPropertiesSlugs,
  fetchActiveProperties,
  getPropertyDetailService,
};
