const AppError = require("../../../../utils/appError");
const { Characteristic } = require("../../../../db/models");
const { slugFormatter, nameFormatter } = require("../../../../utils/stringFormatter");

const findOrCreateCharacteristic = async ({ exists, value }, tenantId) => {
  
  let characteristic;

  if (!value && value !== 0) {
    throw new AppError("Missing characteristic value", 400);
  }

  if (exists === true) {
    characteristic = await Characteristic.findOne({
      where: {
        id: value, // <-- busca por id
        tenantId,
      },
    });

    if (!characteristic) {
      throw new AppError("Invalid characteristic", 400);
    }
  } else if (
    exists === false &&
    (value !== "" && value !== null && value !== undefined)
  ) {
    characteristic = await Characteristic.create({
      slug: slugFormatter(value),
      name: nameFormatter(value),
      tenantId,
    });
  } else {
    throw new AppError("Missing or invalid characteristic", 400);
  }

  return characteristic;
};

module.exports = {
  findOrCreateCharacteristic,
};
