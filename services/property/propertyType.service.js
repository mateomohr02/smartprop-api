const { PropertyType } = require("../../db/models");
const { slugFormatter , nameFormatter} = require("../../utils/stringFormatter");

const fetchOrCreatePropertyType = async (propertyTypeSlug, tenantId) => {
  
    //RECIBE SLUG o NAME TIPO DE PROP

  if (!propertyTypeSlug) return false;

  //COMPRUEBA LA EXISTENCIA DE UN PROPERTYTYPE CON ESTE SLUG

  const existingPropertyType = await PropertyType.findOne({
    where: {
      slug: propertyTypeSlug,
      tenantId,
    },
  });

  //SI NO EXISTE EL PROPERTYTYPE, LO CREA Y LO RETORNA

  if (!existingPropertyType) {
    const created = await PropertyType.create({
      name: nameFormatter(propertyTypeSlug),
      slug: slugFormatter(propertyTypeSlug),
      tenantId,
    });

    return created.id;
  }

  //REOTRNA ID DEL TIPO DE PROPIEDAD ENCONTRADO

  return existingPropertyType.id;
};

module.exports = {
  fetchOrCreatePropertyType,
};
