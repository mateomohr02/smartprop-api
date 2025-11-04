const { 
    fetchPlacesController,
    parseMapLocation
} = require("../../controllers/admin/admin.places.controller");

const router = require("express").Router();

router.route("").post(fetchPlacesController);

router.route("/parse").post(parseMapLocation);

module.exports = router;
