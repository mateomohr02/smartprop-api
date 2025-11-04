const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");

const {
  fetchCharacteristics,
} = require("../../services/admin/characteristics/admin.characteristics.service");

const fetchCharacteristicsController = catchAsync(async (req, res) => {
  const { tenant } = req;

  if (!tenant) {
    return next(new AppError("Missing data for request.", 400))
  }

  const characteristics = await fetchCharacteristics(tenant.id);

  return res.status(200).json({
    status: "success",
    characteristics,
  });
});

module.exports = {
    fetchCharacteristicsController,
}