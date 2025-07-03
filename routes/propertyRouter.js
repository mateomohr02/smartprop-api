const { createProperty, getPropertiesTenant, setIsActiveProperty } = require("../controllers/propertyController");

const router = require("express").Router();

router.route("/").get(getPropertiesTenant);
router.route("/create").post(createProperty);
router.route("/:propertyId/deactivate").put( setIsActiveProperty )
module.exports = router;
