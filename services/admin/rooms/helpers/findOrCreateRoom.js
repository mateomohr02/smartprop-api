const AppError = require("../../../../utils/appError");
const { Room } = require("../../../../db/models");
const { slugFormatter, nameFormatter } = require("../../../../utils/stringFormatter");


const findOrCreateRoom = async ({exists, value}, tenantId) => {

    let room;

    if (exists === true) {
    room = await Room.findOne({
      where: {
        id: value,
        tenantId,
      },
    });

    if (!room) {
      throw new AppError("Invalid room", 400);
    }
  } else if (
    exists === false &&
    (value !== "" && value !== null && value !== undefined)
  ) {
    room = await Room.create({
      slug: slugFormatter(value),
      name: nameFormatter(value),
      tenantId,
    });
  } else {
    throw new AppError("Missing or invalid room", 400);
  }

  return room;

}

module.exports = {
    findOrCreateRoom
}