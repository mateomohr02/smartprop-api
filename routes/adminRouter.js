const { fetchPropertiesController } = require('../controllers/adminController');

const router = require('express').Router();

router.route('/properties').get(fetchPropertiesController);

module.exports = router;