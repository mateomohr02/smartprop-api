const catchAsync = require("../../utils/catchAsync");

const {
  fetchCharacteristics,
} = require("../../services/admin/characteristics/admin.characteristics.service");

const fetchCharacteristicsController = catchAsync(async (req, res) => {
  const { tenant } = req;

  if (!tenant) {
    return res.status(400).json({
      message: "Faltan datos necesarios para realizar la petición",
    });
  }

  const characteristics = await fetchCharacteristics(tenant.id);

  return res.status(200).json({
    status: "success",
    data: characteristics,
  });
});

module.exports = {
    fetchCharacteristicsController,
}