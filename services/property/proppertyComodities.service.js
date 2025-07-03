const { PropertyComodities } = require("../../db/models");
const AppError = require("../../utils/appError");

const addPropertyComodities = async (
  { grill, meetingsRoom, pool, laundry, gym, elevator, gazebo, caretaker },
  propertyId,
  tenantId
) => {
  const addedPropertyComodities = await PropertyComodities.create({
    propertyId,
    grill,
    meetingsRoom,
    pool,
    laundry,
    gym,
    elevator,
    gazebo,
    caretaker,
    tenantId,
  });

  if (!addedPropertyComodities) {
    throw new AppError("Error while adding the Property features.");
  }

  return addedPropertyComodities ;

};

module.exports = {
  addPropertyComodities,
};
