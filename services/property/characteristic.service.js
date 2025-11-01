const AppError = require("../../utils/appError");
const { Characteristic, PropertyCharacteristic } = require("../../db/models");
const { slugFormatter, nameFormatter } = require("../../utils/stringFormatter");

const fetchandCreateCharacteristics = async (characteristics = [], propertyId, tenantId) => {
  if (!characteristics.length) {
    console.log("No characteristics to process.");
    return [];
  }

  console.log(characteristics, "characteristics to process");

  // Normalizamos slugs por seguridad
  const slugs = characteristics.map((c) => slugFormatter(c.slug || c.characteristicSlug));

  // Buscar las características existentes del tenant
  const existingTenantCharacteristics = await Characteristic.findAll({
    where: { slug: slugs, tenantId },
  });

  const existingSlugToId = existingTenantCharacteristics.reduce((acc, c) => {
    acc[c.slug] = c.id;
    return acc;
  }, {});

  const missingSlugs = slugs.filter((slug) => !existingSlugToId[slug]);
  console.log(missingSlugs, "missing slugs");

  // Crear las faltantes
  let createdSlugToId = {};
  if (missingSlugs.length) {
    const createdCharacteristics = await Promise.all(
      missingSlugs.map((slug) =>
        Characteristic.create({
          name: nameFormatter(slug),
          slug,
          tenantId,
        })
      )
    );

    createdSlugToId = createdCharacteristics.reduce((acc, c) => {
      acc[c.slug] = c.id;
      return acc;
    }, {});
  }

  // Combinar IDs existentes y creados
  const allSlugToId = { ...existingSlugToId, ...createdSlugToId };

  // Si por alguna razón no hay IDs válidos, no crear relaciones
  if (!Object.keys(allSlugToId).length) {
    console.log("No valid characteristics found or created.");
    return [];
  }

  // Crear registros en PropertyCharacteristic
  const propertyCharacteristicsRecords = await Promise.all(
    characteristics.map(({ characteristicSlug, slug }) => {
      const formattedSlug = slugFormatter(characteristicSlug || slug);
      const characteristicId = allSlugToId[formattedSlug];

      if (!characteristicId) {
        console.warn(`Skipping characteristic '${formattedSlug}' — not found.`);
        return null;
      }

      return PropertyCharacteristic.create({
        propertyId,
        characteristicId,
        tenantId,
      });
    })
  );

  // Filtramos los nulos (por si se saltó alguno)
  return propertyCharacteristicsRecords.filter(Boolean);
};

module.exports = {
  fetchandCreateCharacteristics,
};
