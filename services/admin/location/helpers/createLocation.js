const { Country, Province, City, Neighborhood } = require("../../../../db/models");
const { slugFormatter, nameFormatter } = require("../../../../utils/stringFormatter");
const AppError = require("../../../../utils/appError");

/**
 * Crea una nueva ubicación en el modelo correspondiente.
 *
 * @param {Object} newLocation - Objeto con los datos de la nueva ubicación.
 * @param {("country"|"province"|"city"|"neighborhood")} newLocation.type - Tipo de ubicación a crear.
 * @param {string} newLocation.value - Nombre de la ubicación (input del usuario).
 * @param {Object|null} fatherLocation - Objeto con los datos de la ubicación padre, si aplica.
 * @param {("country"|"province"|"city"|"neighborhood")} fatherLocation.type - Tipo de ubicación padre.
 * @param {string} fatherLocation.value - ID de la ubicación padre.
 */
const createLocation = async (newLocation, fatherLocation = null) => {
  const { type, value } = newLocation;

  if (!type || !value) {
    throw new AppError("Missing location type or value", 400);
  }

  const formattedName = nameFormatter(value);
  const formattedSlug = slugFormatter(value);

  switch (type) {
    case "country": {
      // No necesita padre
      const existing = await Country.findOne({ where: { slug: formattedSlug } });
      if (existing) return existing; // evitar duplicados

      return await Country.create({
        name: formattedName,
        slug: formattedSlug,
      });
    }

    case "province": {
      if (!fatherLocation || fatherLocation.type !== "country") {
        throw new AppError("Province must have a valid country as parent", 400);
      }

      const country = await Country.findByPk(fatherLocation.value);
      if (!country) throw new AppError("Parent country not found", 404);

      const existing = await Province.findOne({
        where: { slug: formattedSlug, countryId: country.id },
      });
      if (existing) return existing;

      return await Province.create({
        name: formattedName,
        slug: formattedSlug,
        countryId: country.id,
      });
    }

    case "city": {
      if (!fatherLocation || fatherLocation.type !== "province") {
        throw new AppError("City must have a valid province as parent", 400);
      }

      const province = await Province.findByPk(fatherLocation.value);
      if (!province) throw new AppError("Parent province not found", 404);

      const existing = await City.findOne({
        where: { slug: formattedSlug, provinceId: province.id },
      });
      if (existing) return existing;

      return await City.create({
        name: formattedName,
        slug: formattedSlug,
        provinceId: province.id,
      });
    }

    case "neighborhood": {
      if (!fatherLocation || fatherLocation.type !== "city") {
        throw new AppError("Neighborhood must have a valid city as parent", 400);
      }

      const city = await City.findByPk(fatherLocation.value);
      if (!city) throw new AppError("Parent city not found", 404);

      const existing = await Neighborhood.findOne({
        where: { slug: formattedSlug, cityId: city.id },
      });
      if (existing) return existing;

      return await Neighborhood.create({
        name: formattedName,
        slug: formattedSlug,
        cityId: city.id,
      });
    }

    default:
      throw new AppError("Invalid location type", 400);
  }
};

module.exports = {
  createLocation,
};
