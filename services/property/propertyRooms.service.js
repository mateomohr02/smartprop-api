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

const fetchOrCreateRooms = async (propertyRooms, tenantId) => {
  if (!propertyRooms || !tenantId  ) {
    throw new AppError("Missing Parmeters while adding Property Rooms", 400);
    
  }
}

module.exports = {
  addPropertyRooms
};
