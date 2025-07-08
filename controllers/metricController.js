const { catchMetricService } = require("../services/metric/metric.service");
const catchAsync = require("../utils/catchAsync");

const receiveMetric = catchAsync(async (req, res) => {
  const metric = req.body;

  await catchMetricService(metric, req.tenant.id);

  res.status(200).json({ status: "success" });
});

module.exports = {
  receiveMetric,
};
