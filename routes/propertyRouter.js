const { createProperty, getPropertiesTenant } = require("../controllers/propertyController");

const router = require("express").Router();

router.route("/").get(getPropertiesTenant);
router.route("/create").post(createProperty);

module.exports = router;
