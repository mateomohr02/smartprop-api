const parseSlugToFilters = (slug) => {
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
  };

  const parts = slug.split("-");

  // Lógica personalizada para parsear cada sección del slug
  // Ejemplo simple:
  if (parts.includes("venta")) filters.operation = "sale";
  if (parts.includes("alquiler")) filters.operation = "rent";

  if (slug.includes("con-")) {
    const comoditiesSection = slug.split("con-")[1].split("-y-");
    filters.comodities = comoditiesSection.map(c => c.trim());
  }

  if (slug.includes("mas-de")) {
    const regex = /mas-de-(\d+)-(banos|cocheras)/g;
    let match;
    while ((match = regex.exec(slug)) !== null) {
      if (match[2] === "banos") filters.minBathrooms = Number(match[1]);
      if (match[2] === "cocheras") filters.minGarages = Number(match[1]);
    }
  }

  // Continuar para bedrooms, ambientes, etc.

  return filters;
};

module.exports = { parseSlugToFilters };