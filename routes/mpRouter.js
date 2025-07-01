const { authentication } = require('../controllers/authController.js');
const { handlePreference, receiveWebhook } = require("../controllers/mercadopagoController.js")

const router = require('express').Router();

//router.post('/webhook', receiveWebhook)

router.post('/create-preference-id', authentication, handlePreference)

module.exports = router;