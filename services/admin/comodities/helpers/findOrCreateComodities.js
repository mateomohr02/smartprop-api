const AppError = require("../../../../utils/appError");
const { Comodity } = require("../../../../db/models");
const { slugFormatter, nameFormatter } = require("../../../../utils/stringFormatter");

const findOrCreateComodities = async ({ exists, value }, tenantId) => {

    let comodity;

    if (exists === true) {
    comodity = await Comodity.findOne({
      where: {
        id: value,
        tenantId,
      },
    });

    if (!comodity) {
      throw new AppError("Invalid comodity", 400);
    }
  } else if (
    exists === false &&
    (value !== "" && value !== null && value !== undefined)
  ) {
    comodity = await Comodity.create({
      slug: slugFormatter(value),
      name: nameFormatter(value),
      tenantId,
    });
  } else {
    throw new AppError("Missing or invalid comodity", 400);
  }

  return comodity;
};

module.exports = {
    findOrCreateComodities
}