const {
  Room,
  Comodity,
  Characteristic,
  City,
  Neighborhood,
  PropertyType,
  Service,
  Property
} = require("../db/models");

// 🔹 Helper genérico para validar filtros de arrays (rooms, comodities, characteristics, services)
async function validateArrayFilter(query, queryKey, Model, tenantId) {
  if (!query[queryKey]) return { filtered: [], invalid: [] };

  const items = await Model.findAll({
    where: { tenantId },
    attributes: ["slug"],
    raw: true,
  });

  const validSlugs = new Set(items.map((i) => i.slug.toLowerCase()));

  const requested = Array.isArray(query[queryKey])
    ? query[queryKey]
    : [query[queryKey]];

  const filtered = requested.filter((i) => validSlugs.has(i.toLowerCase()));
  const invalid = requested.filter((i) => !validSlugs.has(i.toLowerCase()));

  return { filtered, invalid };
}

const parseSlugToFilters = async (slug, query, tenantId) => {

  const parts = slug.split("-");

  const filters = {
    operation: null,
    propertyTypes: [],
    city: null,
    neighborhood: null,
    comodities: [],
    rooms: [],
    services: [],
    characteristics: [],
    minBathrooms: null,
    minGarages: null,
    minBedrooms: null,
    maxBedrooms: null,
    minAmbientes: null,
    maxAmbientes: null,
    minPrice: null,
    maxPrice: null,
    currency: null,
    minExpenses: null,
    maxExpenses: null,
    expensesCurrency: null,
  };

  const errorMessages = {
    operation: {
      status: false,
      message: `No se encontraron propiedades para la operación ${
        parts[0] || "sin definir"
      }.`,
    },
    propertyType: {
      status: false,
      message: `No se encontraron propiedades del tipo ${
        parts[1] || "sin definir"
      }.`,
    },
    locationType: {
      status: false,
      message: `${
        parts[4] || "sin definir"
      } no es válido. Use 'ciudad' o 'barrio'.`,
    },
    locationName: {
      status: false,
      message: `Error al buscar propiedades en ${parts[7] || "sin definir"}.`,
    },
  };

  // --- Validaciones del slug ---
  if (!parts[0] || (parts[0] !== "alquilar" && parts[0] !== "comprar")) {
    errorMessages.operation.status = true;
  } else {
    filters.operation = parts[0] === "alquilar" ? "rent" : "sale";
  }

  const tenantPropertyTypes = await PropertyType.findAll({
    where: { tenantId },
  });

  if (!parts[1] || !tenantPropertyTypes.some((pt) => pt.slug === parts[1])) {
    errorMessages.propertyType.status = true;
  } else {
    const matchedType = tenantPropertyTypes.find((pt) => pt.slug === parts[1]);
    filters.propertyTypes.push(matchedType.id);
  }

  // Parte 4: locationType (ciudad / barrio)
if (parts[4] && parts[4] !== "ciudad" && parts[4] !== "barrio") {
  errorMessages.locationType.status = true;
} else {
  let tenantLocationMatch = false;

  // Reconstruir el locationSlug (desde parte[5] en adelante)
  const locationSlug = parts.slice(6).join("-");

  console.log(locationSlug, "locationSlug", parts, "parts");
  

  if (parts[4] === "ciudad") {
    // Buscar la ciudad globalmente
    const matchedCity = await City.findOne({ where: { slug: locationSlug } });

    if (matchedCity) {
      // Verificar que el tenant tenga al menos una propiedad en esa ciudad
      const propertyInCity = await Property.findOne({
        where: { tenantId, cityId: matchedCity.id },
      });

      if (propertyInCity) {
        filters.city = matchedCity.id;
        tenantLocationMatch = true;
      } else {
        errorMessages.locationName.status = true;
      }
    } else {
      errorMessages.locationName.status = true;
    }
  } else if (parts[4] === "barrio") {
    // Buscar el barrio globalmente
    const matchedNeighborhood = await Neighborhood.findOne({
      where: { slug: locationSlug },
    });

    if (matchedNeighborhood) {
      // Verificar que el tenant tenga al menos una propiedad en ese barrio
      const propertyInNeighborhood = await Property.findOne({
        where: { tenantId, neighborhoodId: matchedNeighborhood.id },
      });

      if (propertyInNeighborhood) {
        filters.neighborhood = matchedNeighborhood.id;
        tenantLocationMatch = true;
      } else {
        errorMessages.locationName.status = true;
      }
    } else {
      errorMessages.locationName.status = true;
    }
  }

  if (!tenantLocationMatch) {
    errorMessages.locationName.status = true;
  }
}


  // --- Filtros desde query ---
  const safeNumber = (val) => {
    const num = Number(val);
    return isNaN(num) ? null : num;
  };

  // Baños
  if (query.banos) filters.minBathrooms = safeNumber(query.banos);

  // Garage
  if (query.garage) filters.minGarages = safeNumber(query.garage);

  // Dormitorios
  if (query["dormitorios-min"])
    filters.minBedrooms = safeNumber(query["dormitorios-min"]);
  if (query["dormitorios-max"])
    filters.maxBedrooms = safeNumber(query["dormitorios-max"]);

  // Ambientes
  if (query["ambientes-min"])
    filters.minAmbientes = safeNumber(query["ambientes-min"]);
  if (query["ambientes-max"])
    filters.maxAmbientes = safeNumber(query["ambientes-max"]);

  // Tipos de ambientes
  const roomsCheck = await validateArrayFilter(
    query,
    "tipos-de-ambientes",
    Room,
    tenantId
  );
  filters.rooms = roomsCheck.filtered;
  if (roomsCheck.invalid.length)
    errorMessages.rooms = {
      status: true,
      message: "Algunos tipos de ambientes no son válidos para este tenant",
    };

  // Comodities
  const comoditiesCheck = await validateArrayFilter(
    query,
    "comodities",
    Comodity,
    tenantId
  );
  filters.comodities = comoditiesCheck.filtered;
  if (comoditiesCheck.invalid.length)
    errorMessages.comodities = {
      status: true,
      message: "Algunas comodities no son válidas para este tenant",
    };

  // Características
  const charCheck = await validateArrayFilter(
    query,
    "caracteristicas",
    Characteristic,
    tenantId
  );
  filters.characteristics = charCheck.filtered;
  if (charCheck.invalid.length)
    errorMessages.characteristics = {
      status: true,
      message: "Algunas características no son válidas para este tenant",
    };

  // Servicios (si aplica)
  const serviceCheck = await validateArrayFilter(
    query,
    "servicios",
    Service,
    tenantId
  );
  filters.services = serviceCheck.filtered;
  if (serviceCheck.invalid.length)
    errorMessages.services = {
      status: true,
      message: "Algunos servicios no son válidos para este tenant",
    };

  // Precios
  if (query["precio-min"]) filters.minPrice = safeNumber(query["precio-min"]);
  if (query["precio-max"]) filters.maxPrice = safeNumber(query["precio-max"]);
  if (query.divisa) filters.currency = query.divisa;

  // Expensas
  if (query["expensas-min"])
    filters.minExpenses = safeNumber(query["expensas-min"]);
  if (query["expensas-max"])
    filters.maxExpenses = safeNumber(query["expensas-max"]);
  if (query.expensas) filters.expensesCurrency = query.expensas;

  // --- Validaciones de rangos ---
  if (
    filters.minPrice &&
    filters.maxPrice &&
    filters.minPrice > filters.maxPrice
  ) {
    errorMessages.priceRange = {
      status: true,
      message: "El rango de precios es inválido",
    };
  }
  if (
    filters.minBedrooms &&
    filters.maxBedrooms &&
    filters.minBedrooms > filters.maxBedrooms
  ) {
    errorMessages.bedroomsRange = {
      status: true,
      message: "El rango de dormitorios es inválido",
    };
  }
  if (
    filters.minAmbientes &&
    filters.maxAmbientes &&
    filters.minAmbientes > filters.maxAmbientes
  ) {
    errorMessages.ambientesRange = {
      status: true,
      message: "El rango de ambientes es inválido",
    };
  }

  return {
    filters,
    errors: Object.values(errorMessages).filter((e) => e.status), // solo los activos
  };
};

module.exports = { parseSlugToFilters };
