const { createTenant } = require('../controllers/tenantController');

const router = require('express').Router();

router.route('/create').post(createTenant);

module.exports = router;