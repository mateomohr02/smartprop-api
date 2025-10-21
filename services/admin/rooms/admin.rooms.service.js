const { Room } = require("../../../db/models");

const fetchOtherRooms = async (tenantId) => {

    const rooms = await Room.findAll({
        where: {tenantId}
    })

    return rooms;

}

module.exports = {
    fetchOtherRooms
}