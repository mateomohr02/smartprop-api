const {
  Country,
  Province,
  City,
  Neighborhood,
} = require("../../../../db/models");
const AppError = require("../../../../utils/appError");

/**
 * Valida si una ubicación con cierto ID y tipo existe en la base de datos.
 * @param {string} value - ID del registro a validar.
 * @param {'country'|'province'|'city'|'neighborhood'} type - Tipo de ubicación.
 * @returns {Promise<Object|null>} - El registro encontrado o null si no existe.
 */
const validateLocation = async (value, type) => {
  if (!type || !value) {
    throw new AppError("Missing location type or value", 400);
  }

  let location;

  switch (type) {
    case "country":
      location = await Country.findByPk(value);
      break;
    case "province":
      location = await Province.findByPk(value);
      break;
    case "city":
      location = await City.findByPk(value);
      break;
    case "neighborhood":
      location = await Neighborhood.findByPk(value);
      break;
    default:
      throw new AppError("Invalid location type", 400);
  }

  return location ?? null;
};

module.exports = {
  validateLocation,
};
