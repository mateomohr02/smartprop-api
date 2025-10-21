const { Characteristic, PropertyCharacteristic } = require("../../db/models");
const { slugFormatter, nameFormatter } = require("../../utils/stringFormatter");

const fetchandCreateCharacteristics = async (
  characteristics = [],
  propertyId,
  tenantId
) => {
  if (!characteristics.length) return [];

  const slugs = characteristics.map(
    (characteristic) => characteristic.characteristicSlug
  );

  // Buscar las comodities existentes del tenant
  const existingTenantCharacteristics = await Characteristic.findAll({
    where: {
      slug: slugs,
      tenantId,
    },
  });

  const existingSlugToId = existingTenantCharacteristics.reduce(
    (acc, characteristic) => {
      acc[characteristic.slug] = characteristic.id;
      return acc;
    },
    {}
  );

  const missingSlugs = slugs.filter((slug) => !existingSlugToId[slug]);

  const createdCharacteristics = await Promise.all(
    missingSlugs.map((slug) =>
      Characteristic.create({
        name: nameFormatter(slug),
        slug: slugFormatter(slug),
        tenantId,
      })
    )
  );

  const createdSlugToId = createdCharacteristics.reduce(
    (acc, characteristic) => {
      acc[characteristic.slug] = characteristic.id;
      return acc;
    },
    {}
  );

  const allSlugToId = { ...existingSlugToId, ...createdSlugToId };

  // Crear registros en PropertyCharacteristics
  const propertyCharacteristicsRecords = await Promise.all(
    characteristics.map(({ characteristicSlug }) => {
      const formattedSlug = slugFormatter(characteristicSlug); // asegurás match
      return PropertyCharacteristic.create({
        propertyId,
        characteristicId: allSlugToId[formattedSlug],
        tenantId,
      });
    })
  );

  return propertyCharacteristicsRecords;
};

module.exports = {
  fetchandCreateCharacteristics,
};
