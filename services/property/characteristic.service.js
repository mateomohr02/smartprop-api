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

  console.log(existingTenantCharacteristics, "existingTenantCharacteristics");

  const existingSlugToId = existingTenantCharacteristics.reduce(
    (acc, characteristic) => {
      acc[characteristic.slug] = characteristic.id;
      return acc;
    },
    {}
  );

  console.log(existingSlugToId, "existingSlugToId");

  const missingSlugs = slugs.filter((slug) => !existingSlugToId[slug]);

  console.log(missingSlugs, "missingSlugs");

  const createdCharacteristics = await Promise.all(
    missingSlugs.map((slug) =>
      Characteristic.create({
        name: nameFormatter(slug),
        slug: slugFormatter(slug),
        tenantId,
      })
    )
  );

  console.log(createdCharacteristics, "createdCharacteristics");

  const createdSlugToId = createdCharacteristics.reduce(
    (acc, characteristic) => {
      acc[characteristic.slug] = characteristic.id;
      return acc;
    },
    {}
  );

  console.log(createdSlugToId, "createdSlugToId");

  const allSlugToId = { ...existingSlugToId, ...createdSlugToId };

  console.log(allSlugToId, "allSlugToId");

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

  console.log(propertyCharacteristicsRecords, "propertyCharacteristicsRecords");

  return propertyCharacteristicsRecords;
};

module.exports = {
  fetchandCreateCharacteristics,
};
