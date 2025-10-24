const AppError = require("../../../utils/appError");
const {
  Property,
  PropertyType,
  City,
  Province,
  Country,
  Neighborhood,
  Comodity,
  Characteristic,
  Room,
} = require("../../../db/models");

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
  console.log(tenantId, property, "put Prop service");

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
  getPropertiesAdmin,
  putProperty,
  fetchPropertyTypes,
  getPropertyDetail,
};
