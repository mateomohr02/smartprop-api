
const catchAsync = require("../../utils/catchAsync");

const {
  fetchComodities,
} = require("../../services/admin/comodities/admin.comodities.service");

const fetchComoditiesController = catchAsync(async (req, res) => {
  const { tenant } = req;

  if (!tenant) {
    return res.status(400).json({
      status: "failure",
      message: "Faltan datos necesarios para realizar la petición",
    });
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