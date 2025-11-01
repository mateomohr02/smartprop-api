
const catchAsync = require("../../utils/catchAsync");

const {
  fetchComodities,
} = require("../../services/admin/comodities/admin.comodities.service");

const fetchComoditiesController = catchAsync(async (req, res) => {
  const { tenant } = req;

  if (!tenant) {
    return next(new AppError("Missing data for request."), 400)
  }

  const comodites = await fetchComodities(tenant.id);

  return res.status(200).json({
    status: "success",
    data: comodites,
  });
});

module.exports = {
    fetchComoditiesController,
}