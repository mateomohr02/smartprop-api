const { 
    fetchPlacesController,
    parseMapLocation
} = require("../../controllers/admin/admin.places.controller");

const router = require("express").Router();

router.route("").get(fetchPlacesController);

router.route("/parse").post(parseMapLocation);

module.exports = router;
