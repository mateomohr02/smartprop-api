const { fetchPropertiesController, fetchDashboardMetricsController, putStatusLeadController, fetchDashboardLeadsController } = require('../controllers/adminController');

const router = require('express').Router();

router.route('/properties').get(fetchPropertiesController);

router.route('/dashboard/metrics').get(fetchDashboardMetricsController);

router.route('/dashboard/leads').get(fetchDashboardLeadsController)

router.route('/lead/:leadId').put(putStatusLeadController);

module.exports = router;