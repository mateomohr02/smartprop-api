const { createProperty, getPropertiesTenant, setIsActiveProperty, getPropertiesFiltered } = require("../controllers/propertyController");

const router = require("express").Router();

router.route("/catalogue").post(getPropertiesFiltered);
router.route("/").get(getPropertiesTenant);
router.route("/create").post(createProperty);
router.route("/:propertyId/deactivate").put(setIsActiveProperty);
module.exports = router;
