// services/comodities/comodities.service.js
const { PropertyComodity, Comodity } = require("../../db/models");
const { nameFormatter, slugFormatter } = require("../../utils/stringFormatter");
const AppError = require("../../utils/appError");

const addPropertyComodities = async (comodities = [], propertyId, tenantId) => {
  if (!comodities.length) return [];

  const slugs = comodities.map((comodity) => comodity.comoditySlug);

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

  const missingSlugs = slugs.filter((slug) => !existingSlugToId[slug]);

  const createdComodities = await Promise.all(
    missingSlugs.map((slug) =>
      Comodity.create({
        name: nameFormatter(slug),
        slug: slugFormatter(slug),
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
    comodities.map(({ comoditySlug }) =>
      PropertyComodity.create({
        propertyId,
        comodityId: allSlugToId[comoditySlug],
        tenantId,
      })
    )
  );

  return propertyComoditiesRecords;
};

module.exports = {
  addPropertyComodities,
};
