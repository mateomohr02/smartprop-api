const { Comodity} = require("../../../db/models");
const AppError = require("../../../utils/appError");


const fetchComodities = async (tenantId) => {

    const comodities = await Comodity.findAll({
        where: {tenantId}
    })

    return comodities;
}

module.exports = {
    fetchComodities
}