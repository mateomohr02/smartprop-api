const { Characteristic } = require("../../db/models");
const { slugFormatter , nameFormatter} = require("../../utils/stringFormatter");

const fetchandCreateCharacteristics = async (arrayCharacteristics = [], tenantId) => {
  if (!arrayCharacteristics.length) return [];

  const slugs = arrayCharacteristics.map((c) => c.characteristicSlug);

  const existingTenantCharacteristics = await Characteristic.findAll({
    where: {
      slug: slugs,
      tenantId,
    },
  });

  const existingSlugs = existingTenantCharacteristics.map((c) => c.slug);
  const existingIds = existingTenantCharacteristics.map((c) => c.id);

  const missing = arrayCharacteristics.filter(
    (c) => !existingSlugs.includes(c.characteristicSlug)
  );

  const created = await Promise.all(
    missing.map((c) =>
      Characteristic.create({
        name: nameFormatter(c.characteristicSlug),
        slug: slugFormatter(c.characteristicSlug),
        tenantId,
      })
    )
  );

  return [...existingTenantCharacteristics, ...created];
};

module.exports = {
    fetchandCreateCharacteristics
}
