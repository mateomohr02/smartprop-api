const { fetchPropertiesController, fetchDashboardMetricsController } = require('../controllers/adminController');

const router = require('express').Router();

router.route('/properties').get(fetchPropertiesController);

router.route('/metrics/dashboard').get(fetchDashboardMetricsController);

module.exports = router;