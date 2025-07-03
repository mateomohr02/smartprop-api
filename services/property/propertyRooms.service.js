const { PropertyRooms } = require("../../db/models");
const AppError = require("../../utils/appError");

const addPropertyRooms = async (
  {    rooms,    bedrooms,    bathrooms,    garage,    toilette,    balcony,
    livingRoom,    laundryRoom,    roofTop,    kitchen 
  }, propertyId,  tenantId  ) => 
{
  const addedPropertyRooms = await PropertyRooms.create({
    propertyId,
    rooms,
    bedrooms,
    bathrooms,
    garage,
    toilette,
    balcony,
    livingRoom,
    laundryRoom,
    roofTop,
    kitchen,
    tenantId
  });

  if (!addedPropertyRooms ) {
    throw new AppError("Error while adding the Property features.");
  }

  return addedPropertyRooms ;
};

module.exports = {
  addPropertyRooms
};
