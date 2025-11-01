const catchAsync = require("../../utils/catchAsync");

const {
  fetchOtherRooms,
} = require("../../services/admin/rooms/admin.rooms.service");

const fetchOtherRoomsController = catchAsync(async (req, res) => {
  const { tenant } = req;

  if (!tenant) {
    return res.status(400).json({
      message: "Faltan datos necesarios para realizar la petición",
    });
  }

  const rooms = await fetchOtherRooms(tenant.id);

  return res.status(200).json({
    status: "success",
    data: rooms,
  });
});


module.exports = {
    fetchOtherRoomsController
}