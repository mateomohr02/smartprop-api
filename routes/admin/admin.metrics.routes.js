const { fetchDashboardMetricsController } = require("../../controllers/admin/admin.metrics.controller");

const router = require("express").Router();

router.route("/dashboard").get(fetchDashboardMetricsController);

module.exports = router;
