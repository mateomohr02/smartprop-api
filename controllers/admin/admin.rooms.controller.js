const catchAsync = require("../../utils/catchAsync");

const {
  fetchOtherRooms,
} = require("../../services/admin/rooms/admin.rooms.service");

const fetchOtherRoomsController = catchAsync(async (req, res) => {
  const { tenant } = req;

  if (!tenant) {
    return next(new AppError("Missing data for request.", 400))
  }

  const rooms = await fetchOtherRooms(tenant.id);

  return res.status(200).json({
    status: "success",
    rooms,
  });
});


module.exports = {
    fetchOtherRoomsController
}