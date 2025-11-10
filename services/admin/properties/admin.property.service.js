const AppError = require("../../../utils/appError");
const { nanoid } = require("nanoid");
const {
  Tenant,
  Property,
  PropertyType,
  City,
  Province,
  Country,
  Neighborhood,
  Comodity,
  Characteristic,
  Room,
  PropertyCharacteristic,
  PropertyComodity,
  PropertyRoom,
  Modification,
} = require("../../../db/models");
const { slugFormatter } = require("../../../utils/stringFormatter");
const { validateLocation } = require("../location/helpers/validateLocation");
const { createLocation } = require("../location/helpers/createLocation");
const {
  findOrCreateCharacteristic,
} = require("../characteristics/helpers/findOrCreateCharacteristic");
const { findOrCreateRoom } = require("../rooms/helpers/findOrCreateRoom");
const {
  findOrCreateComodities,
} = require("../comodities/helpers/findOrCreateComodities");

//CREATE PROPERTY SERVICES
const createPropertyRegistry = async (tenantId, userId, propertyData) => {
  let propertyType;

  if (propertyData.propertyType.exists === true) {
    propertyType = await PropertyType.findOne({
      where: {
        slug: propertyData.propertyType.value,
        tenantId,
      },
    });

    if (!propertyType) {
      throw new AppError("Invalid property type", 400);
    }
  } else if (
    !propertyData.propertyType.exists &&
    propertyData.propertyType.value
  ) {
    const slug = slugFormatter(propertyData.propertyType.value);
    propertyType = await PropertyType.create({
      name: propertyData.propertyType.value,
      slug,
      tenantId,
    });
  } else {
    throw new AppError("Missing property type", 400);
  }


  const property = await Property.create({
    title: propertyData.title,
    description: propertyData.description,
    propertyTypeId: propertyType.id,
    tenantId,
  });


  return property;
};

const addPropertyData = async (propertyId, tenantId, userId, propertyData) => {
  let property = await Property.findOne({
    where: { id: propertyId, tenantId },
  });

  if (!property) {
    throw new AppError("Invalid property", 400);
  }

  if (propertyData.price) {
    property.price = propertyData.price.value;
    property.priceFIAT = propertyData.price.currency;
  }

  if (propertyData.expenses) {
    property.expenses = propertyData.expenses.value;
    property.expensesFIAT = propertyData.expenses.currency;
  }

  property.operation = propertyData.operation ?? null;
  property.financing = propertyData.financing ?? null;
  property.rooms = propertyData.rooms ?? null;
  property.bedrooms = propertyData.bedrooms ?? null;
  property.bathrooms = propertyData.bathrooms ?? null;
  property.garages = propertyData.garages ?? null;
  property.surface = propertyData.surface ?? null;
  property.services = propertyData.services ?? null;
  property.condition = propertyData.condition ?? null;
  property.age = propertyData.age ?? null;

  if (propertyData.availability?.type === "inmediate") {
    property.availabilityType = "inmediate";
    property.availabilityDate = new Date();
  } else if (propertyData.availability?.type === "date") {
    property.availabilityType = "date";
    property.availabilityDate = propertyData.availability.value;
  } else {
    throw new AppError("Invalid availability type", 400);
  }

  await property.save();
  return property;
};

const addPropertyLocation = async (
  propertyId,
  tenantId,
  userId,
  propertyData
) => {
  const property = await Property.findOne({
    where: { id: propertyId, tenantId },
  });

  if (!property) throw new AppError("Invalid property", 400);

  console.log(propertyData, 'body location');
  

  // === COUNTRY ===
  let countryId;
  if (propertyData.country.exists === true) {
    const country = await validateLocation(
      propertyData.country.value,
      "country"
    );
    if (!country) throw new AppError("Invalid country", 400);
    countryId = country.id;
  } else if (propertyData.country.exists === false) {
    const country = await createLocation({
      type: "country",
      value: propertyData.country.value,
    });
    countryId = country.id;
  } else {
    throw new AppError("Missing country", 400);
  }

  // === PROVINCE ===

  let provinceId;
  if (propertyData.province.exists === true) {
    const province = await validateLocation(
      propertyData.province.value,
      "province"
    );
    if (!province) throw new AppError("Invalid province", 400);
    provinceId = province.id;
  } else if (propertyData.province.exists === false) {
    const province = await createLocation(
      { type: "province", value: propertyData.province.value },
      { type: "country", value: countryId }
    );
    provinceId = province.id;
  } else {
    throw new AppError("Missing province", 400);
  }

  // === CITY ===
  let cityId;
  if (propertyData.city.exists === true) {
    const city = await validateLocation(propertyData.city.value, "city");
    if (!city) throw new AppError("Invalid city", 400);
    cityId = city.id;
  } else if (propertyData.city.exists === false) {
    const city = await createLocation(
      { type: "city", value: propertyData.city.value },
      { type: "province", value: provinceId }
    );
    cityId = city.id;
  } else {
    throw new AppError("Missing city", 400);
  }

  // === NEIGHBORHOOD ===

  let neighborhoodId;
  if (propertyData.neighborhood.exists === true) {
    const neighborhood = await validateLocation(
      propertyData.neighborhood.value,
      "neighborhood"
    );
    if (!neighborhood) throw new AppError("Invalid neighborhood", 400);
    neighborhoodId = neighborhood.id;
  } else if (propertyData.neighborhood.exists === false) {
    const neighborhood = await createLocation(
      { type: "neighborhood", value: propertyData.neighborhood.value },
      { type: "city", value: cityId }
    );
    neighborhoodId = neighborhood.id;
  } // barrio puede faltar, no se lanza error si no viene

  // === ASIGNACIÓN A LA PROPIEDAD ===
  property.countryId = countryId;
  property.provinceId = provinceId;
  property.cityId = cityId;
  property.neighborhoodId = neighborhoodId ?? null;
  property.address = propertyData.address ?? null;
  property.mapLocation = propertyData.mapLocation ?? null;

  await property.save();

  return property;
};

const addPropertyMultimedia = async (
  propertyId,
  tenantId,
  userId,
  propertyData
) => {
  const property = await Property.findOne({
    where: { id: propertyId, tenantId },
  });

  if (!property) throw new AppError("Invalid property", 400);

  property.multimedia = propertyData.multimedia || null;

  await property.save();

  return property;
};

const addPropertyCharacteristics = async (
  propertyId,
  tenantId,
  userId,
  propertyData
) => {
  const property = await Property.findOne({
    where: { id: propertyId, tenantId },
  });

  if (!property) throw new AppError("Invalid property", 400);
  if (!Array.isArray(propertyData.characteristics)) {
    throw new AppError("Invalid characteristics format", 400);
  }

  const propertyCharacteristics = await Promise.all(
    propertyData.characteristics.map(async (char) => {
      const foundCharacteristic = await findOrCreateCharacteristic(
        char,
        tenantId
      );
      return await PropertyCharacteristic.create({
        propertyId,
        characteristicId: foundCharacteristic.id,
        tenantId,
      });
    })
  );

  return propertyCharacteristics;
};

const addPropertyComodities = async (
  propertyId,
  tenantId,
  userId,
  propertyData
) => {
  const property = await Property.findOne({
    where: { id: propertyId, tenantId },
  });

  if (!property) throw new AppError("Invalid property", 400);
  if (!Array.isArray(propertyData.comodities)) {
    throw new AppError("Invalid comodities format", 400);
  }

  const propertyComodities = await Promise.all(
    propertyData.comodities.map(async (com) => {
      const foundComodity = await findOrCreateComodities(com, tenantId);
      return await PropertyComodity.create({
        propertyId,
        comodityId: foundComodity.id,
        tenantId,
      });
    })
  );

  return propertyComodities;
};

const addPropertyRooms = async (propertyId, tenantId, userId, propertyData) => {
  const property = await Property.findOne({
    where: { id: propertyId, tenantId },
  });

  if (!property) throw new AppError("Invalid property", 400);
  if (!Array.isArray(propertyData.rooms)) {
    throw new AppError("Invalid properties format", 400);
  }

  const propertyRooms = await Promise.all(
    propertyData.rooms.map(async (room) => {
      const foundRoom = await findOrCreateRoom(room, tenantId);
      return await PropertyRoom.create({
        propertyId,
        roomId: foundRoom.id,
        size: room.size || null,
        value: room.quantity || 1,
        tenantId,
      });
    })
  );

  return propertyRooms;
};

const publishProperty = async (propertyId, tenant, userId) => {
  const property = await Property.findOne({
  where: { id: propertyId, tenantId: tenant.id },
  include: [
    { model: PropertyType, attributes: ["name"] },
    { model: City, attributes: ["name"] },
    { model: Province, attributes: ["name"] },
    { model: Country, attributes: ["name"] },
    { model: Neighborhood, attributes: ["name"] },
    {
      model: Comodity,
      through: { attributes: [] },
      attributes: ["name", "id"],
    },
    {
      model: Characteristic,
      through: { attributes: [] },
      attributes: ["name", "id"],
    },
    {
      model: Room,
      through: { attributes: [] },
      attributes: ["name", "id"],
    },
    {
      model: Tenant,
      attributes: ["name"],
    },
  ],
});


  if (!property) throw new AppError("Invalid property", 400);

  console.log(property, 'propiedad');
  
  const shortId = nanoid(6);
  const propertySlug = slugFormatter(
    `${
      property.operation === "sale"
        ? "venta"
        : property.operation === "rent"
        ? "alquiler"
        : "short-term"
    } ${property.title} ${property.rooms} "ambientes" ${
      property.address
    } "en" ${property.City.name} ${property.Neighborhood.name} ${
      property.price
    } ${property.priceFIAT} ${tenant.id} ${shortId}`
  );

  property.slug = propertySlug;

  property.status = "published";

  console.log(property, 'property to publish');
  

  await property.save();
  
  const modification = await Modification.create({
    propertyId: property.id,
    userId,
    tenantId: tenant.id,
    metadata: { property },
  });


  return property;
};

//OTHER SERVICES
const getPropertiesAdmin = async (tenantId) => {
  const properties = await Property.findAll({
    where: {
      tenantId,
    },
  });

  if (!properties) {
    throw new AppError("No properties found", 404);
  }

  return properties;
};

const getPropertyDetail = async (tenantId, propertyId) => {
  const property = await Property.findOne({
    where: { id: propertyId, tenantId },
    include: [
      { model: PropertyType, attributes: ["name"] },
      { model: City, attributes: ["name"] },
      { model: Province, attributes: ["name"] },
      { model: Country, attributes: ["name"] },
      { model: Neighborhood, attributes: ["name"] },
      {
        model: Comodity,
        through: { attributes: [] },
        attributes: ["name", "id"],
      },
      {
        model: Characteristic,
        through: { attributes: [] },
        attributes: ["name", "id"],
      },
      {
        model: Room,
        through: { attributes: [] },
        attributes: ["name", "id"],
      },
    ],
  });

  if (!property) {
    throw new AppError("No property found", 404);
  }

  return property;
};

const putProperty = async (tenantId, property) => {
  const { id, ...fieldsToUpdate } = property;

  const propertyFound = await Property.findOne({
    where: { id, tenantId },
  });

  if (!propertyFound) {
    throw new AppError("No se encontró la propiedad", 404);
  }

  await propertyFound.update(fieldsToUpdate);

  return propertyFound;
};

const fetchPropertyTypes = async (tenantId) => {
  const propertyTypes = await PropertyType.findAll({
    where: { tenantId },
  });

  return propertyTypes;
};

module.exports = {
  createPropertyRegistry,
  addPropertyData,
  addPropertyLocation,
  addPropertyCharacteristics,
  addPropertyMultimedia,
  addPropertyComodities,
  addPropertyRooms,
  getPropertiesAdmin,
  putProperty,
  fetchPropertyTypes,
  getPropertyDetail,
  publishProperty,
};
