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
        throw new AppError(`Unknown Location Type: ${locationChildOf.type}`);
    }
  } catch (error) {
    console.error("Error al obtener ubicaciones:", error);
    throw new AppError("No child Locations found.");
  }
};

const getLatLngFromGoogleMapsUrl = async (url) => {
  try {
    const response = await fetch(url, { redirect: "follow" });
    const finalUrl = response.url;
    
    const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
    const match = finalUrl.match(regex);

    if (match) {
      return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
    }

    const qMatch = finalUrl.match(/[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (qMatch) {
      return { lat: parseFloat(qMatch[1]), lng: parseFloat(qMatch[2]) };
    }

    return null;
  } catch (error) {
    throw new AppError("Error getting coordinates.");
  }
};


module.exports = {
  fetchLocations,
  getLatLngFromGoogleMapsUrl
};
