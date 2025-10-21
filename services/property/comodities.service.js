// services/comodities/comodities.service.js
const { PropertyComodity, Comodity } = require("../../db/models");
const { nameFormatter, slugFormatter } = require("../../utils/stringFormatter");
const AppError = require("../../utils/appError");

const addPropertyComodities = async (comodities = [], propertyId, tenantId) => {
  try {
    if (!comodities.length) return [];

    // Estandarizamos los slugs
    const formattedComodities = comodities.map((c) => ({
      ...c,
      comoditySlug: slugFormatter(c.comoditySlug),
    }));

    const slugs = formattedComodities.map((c) => c.comoditySlug);

    // Buscar las comodities existentes del tenant
    const existingTenantComodities = await Comodity.findAll({
      where: {
        slug: slugs,
        tenantId,
      },
    });

    const existingSlugToId = existingTenantComodities.reduce((acc, comodity) => {
      acc[comodity.slug] = comodity.id;
      return acc;
    }, {});

    // Detectar las que faltan crear
    const missingSlugs = slugs.filter((slug) => !existingSlugToId[slug]);

    const createdComodities = await Promise.all(
      missingSlugs.map((slug) =>
        Comodity.create({
          name: nameFormatter(slug),
          slug,
          tenantId,
        })
      )
    );

    const createdSlugToId = createdComodities.reduce((acc, comodity) => {
      acc[comodity.slug] = comodity.id;
      return acc;
    }, {});

    const allSlugToId = { ...existingSlugToId, ...createdSlugToId };

    // Crear registros en PropertyComodities
    const propertyComoditiesRecords = await Promise.all(
      formattedComodities.map(({ comoditySlug }) =>
        PropertyComodity.create({
          propertyId,
          comodityId: allSlugToId[comoditySlug],
          tenantId,
        })
      )
    );

    return propertyComoditiesRecords;
  } catch (error) {
    console.error("Error en addPropertyComodities:", error);
    throw new AppError("Error al asociar comodities a la propiedad.", 500);
  }
};

module.exports = {
  addPropertyComodities,
};

