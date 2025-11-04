const { fetchCharacteristicsController } = require("../../controllers/admin/admin.characteristics.controller");

const router = require("express").Router();

router.route("").get(fetchCharacteristicsController);

module.exports = router;
