const { Features } = require("../../db/models");
const AppError = require("../../utils/appError");

const createFeature = async (
  {
    rooms,
    bedrooms,
    bathrooms,
    toilettes,
    garage,
    balcony,
    meetingsRoom,
    laundryRoom,
    roofTop,
    kitchen,
  },
  propertyId,
  tenantId
) => {
  const featureProp = await Features.create({
    propertyId,
    tenantId,
    rooms,
    bedrooms,
    bathrooms,
    toilettes,
    garage,
    balcony,
    meetingsRoom,
    laundryRoom,
    roofTop,
    kitchen,
  });

  if (!featureProp) {
    throw new AppError("Error while adding the Property features.");
  }

  return featureProp;
};

module.exports = {
  createFeature
};
