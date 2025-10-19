const { Country, Province, City, Neighborhood } = require("../../../db/models");
const AppError = require("../../../utils/appError");

/**
 * Obtiene las ubicaciones hijas de una ubicación padre.
 * - Si no se pasa `locationChildOf`, devuelve todos los países.
 * - Si se pasa una ubicación (ej: Ciudad de Córdoba), devuelve sus hijos (ej: barrios).
 */
const fetchLocations = async (locationChildOf = null) => {
  try {
    if (!locationChildOf || Object.keys(locationChildOf).length === 0) {
      const countries = await Country.findAll({
        attributes: ["id", "name", "slug"],
        order: [["name", "ASC"]],
      });
      return countries;
    }

    // Determinar qué tipo de ubicación es y traer sus hijos
    switch (locationChildOf.type?.toLowerCase()) {
      case "país":
      case "pais":
      case "country":
        return await Province.findAll({
          where: { countryId: locationChildOf.id },
          attributes: ["id", "name", "slug", "countryId"],
          order: [["name", "ASC"]],
        });

      case "provincia":
      case "province":
        return await City.findAll({
          where: { provinceId: locationChildOf.id },
          attributes: ["id", "name", "slug", "provinceId"],
          order: [["name", "ASC"]],
        });

      case "ciudad":
      case "city":
        return await Neighborhood.findAll({
          where: { cityId: locationChildOf.id },
          attributes: ["id", "name", "slug", "cityId"],
          order: [["name", "ASC"]],
        });

      default:
        throw new AppError(`Tipo de ubicación no reconocido: ${locationChildOf.type}`);
    }
  } catch (error) {
    console.error("Error al obtener ubicaciones:", error);
    throw new AppError("No se pudieron obtener las ubicaciones hijas.");
  }
};

module.exports = {
  fetchLocations,
};
