const {
  catchMetricService,
  updateHeatPropertiesService,
} = require("../services/metric/metric.service");
const catchAsync = require("../utils/catchAsync");

const receiveMetric = catchAsync(async (req, res) => {
  const metric = req.body;

  await catchMetricService(metric, req.tenant.id);

  res.status(200).json({ status: "success" });
});

const updateHeatProperties = catchAsync(async (req, res) => {
  const { tenantId } = req.params;

  const result = await updateHeatPropertiesService(tenantId);

  res.status(200).json({
    status: "success",
    data: result,
  });
});

module.exports = {
  receiveMetric,
  updateHeatProperties,
};
