const { Characteristic } = require("../../db/models");
const { slugFormatter , nameFormatter} = require("../../utils/stringFormatter");

const fetchandCreateCharacteristics = async (arrayCharacteristics = [], tenantId) => {

    //RECIBE ARREGLO DE CARACTERÍSTICAS

  if (!arrayCharacteristics.length) return [];

  const existingTenantCharacteristics = await Characteristic.findAll({
    where: {
      slug: arrayCharacteristics,
      tenantId,
    },
  });

  //BUSCA CARACTERÍSTICAS EXISTENTES EN BASE A LOS SLUGS EN EL ARRAY Y AL ID DEL TENANT

  const existingSlugs = existingTenantCharacteristics.map((c) => c.slug);
  const existingIds = existingTenantCharacteristics.map((c) => c.id);

  //COMPRUEBA LAS CARACTERÍSTICAS QUE NO EXISTEN
  
  const missingSlugs = arrayCharacteristics.filter((slug) => !existingSlugs.includes(slug));

  //CREA LAS CARACTERÍSTICAS NUEVAS

  const created = await Promise.all(
    missingSlugs.map((newCharName) => Characteristic.create({
      name: nameFormatter(newCharName), 
      slug: slugFormatter(newCharName),
      tenantId
    }))
  );

  //OBTIENE LOS IDS DE LAS CARACTERÍSTICAS NUEVAS

  const createdIds = created.map((c) => c.id);

  //DEVUELVE UN ARRAY CON LAS CARACTERÍSTICAS NUEVAS Y ENCONTRADAS

  return [...existingIds, ...createdIds];
};

module.exports = {
    fetchandCreateCharacteristics
}
