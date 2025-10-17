const AppError = require("../../../utils/appError");
const { Property } = require("../../../db/models");

const getPropertiesAdmin = async (tenantId) => {

    const properties = await Property.findAll({
        where: {
            tenantId,
        }
    })

    if (!properties) {
        throw new AppError("No properties found", 404);
    }   

    return properties;
}

const putProperty = async (tenantId, property) => {
    console.log(tenantId, property, 'put Prop service');
    
    const { id, ...fieldsToUpdate } = property;

    const propertyFound = await Property.findOne({
      where: { id, tenantId },
    });

    if (!propertyFound) {
      throw new AppError("No se encontró la propiedad", 404);
    }

    await propertyFound.update(fieldsToUpdate);

    return propertyFound;
}

module.exports = {
    getPropertiesAdmin,
    putProperty

}