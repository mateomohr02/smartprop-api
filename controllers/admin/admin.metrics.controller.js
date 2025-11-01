const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");

const {
  fetchDashboardMetrics,
} = require("../../services/admin/metrics/admin.metrics.service");

const fetchDashboardMetricsController = catchAsync(async (req, res) => {
  const { tenant } = req;
  const metrics = await fetchDashboardMetrics(tenant.id);
  return res.status(200).json({ status: "success", data: metrics });
});

module.exports = {
    fetchDashboardMetricsController
}