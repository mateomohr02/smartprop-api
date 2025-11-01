const { PropertyType } = require("../../db/models");
const { slugFormatter , nameFormatter} = require("../../utils/stringFormatter");
const AppError = require("../../utils/appError");


const fetchOrCreatePropertyType = async (propertyTypeSlug, tenantId) => {
  
  if (!propertyTypeSlug) return false;

  const existingPropertyType = await PropertyType.findOne({
    where: {
      slug: propertyTypeSlug,
      tenantId,
    },
  });

  if (!existingPropertyType) {
    const created = await PropertyType.create({
      name: nameFormatter(propertyTypeSlug),
      slug: slugFormatter(propertyTypeSlug),
      tenantId,
    });

    return created.id;
  }


  return existingPropertyType.id;
};

module.exports = {
  fetchOrCreatePropertyType,
};
