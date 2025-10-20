const { Characteristic } = require("../../../db/models");
const AppError = require("../../../utils/appError");


const fetchCharacteristics = async (tenantId) => {

    const characteristic = await Characteristic.findAll({
        where: {tenantId}
    })

    return characteristic;
}

module.exports = {
    fetchCharacteristics
}