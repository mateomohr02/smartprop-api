const { 
    fetchComoditiesController,
 } = require("../../controllers/admin/admin.comodities.controller");

const router = require("express").Router();

router.route("").get(fetchComoditiesController);

module.exports = router;