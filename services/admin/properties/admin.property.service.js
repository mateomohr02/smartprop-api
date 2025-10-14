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



module.exports = {
    getPropertiesAdmin


}