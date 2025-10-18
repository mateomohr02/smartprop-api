const {
  fetchPropertiesController,
  fetchDashboardMetricsController,
  putStatusLeadController,
  fetchDashboardLeadsController,
  fetchLeadDetailController,
  putPropertyController,
  fetchPopertyTypesController,
} = require("../controllers/adminController");

const router = require("express").Router();

router.route("/properties").get(fetchPropertiesController);

router.route("/dashboard/metrics").get(fetchDashboardMetricsController);

router.route("/dashboard/leads").get(fetchDashboardLeadsController);

router.route("/lead/:leadId").get(fetchLeadDetailController);

router.route("/lead/:leadId").put(putStatusLeadController);

router.route("/properties/edit").put(putPropertyController);

router.route("/properties/types").get(fetchPopertyTypesController);

module.exports = router;
