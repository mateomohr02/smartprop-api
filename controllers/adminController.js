const {
  getPropertiesAdmin,
} = require("../services/admin/properties/admin.property.service");
const {
  fetchDashboardMetrics,
  fetchConsults,
} = require("../services/admin/metrics/admin.metrics.service");
const catchAsync = require("../utils/catchAsync");

const fetchPropertiesController = catchAsync(async (req, res) => {
  const { tenant } = req;

  const properties = await getPropertiesAdmin(tenant.id);

  return res.status(200).json({
    status: "success",
    data: properties,
  });
});

const fetchDashboardMetricsController = catchAsync(async (req, res) => {
  const { tenant } = req;

  // Ejecutar ambas promesas en paralelo
  const [metrics, consults] = await Promise.all([
    fetchDashboardMetrics(tenant.id),
    fetchConsults(tenant.id)
  ]);

  return res.status(200).json({
    status: "success",
    data: { metrics, consults },
  });
});


module.exports = {
  fetchPropertiesController,
  fetchDashboardMetricsController,
};
