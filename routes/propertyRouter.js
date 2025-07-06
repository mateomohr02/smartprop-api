const { createProperty, getPropertiesTenant, setIsActiveProperty, getPropertiesFiltered } = require("../controllers/propertyController");

const { createPropertySchema } = require("../schemas/property.schema");
const validate = require("../middlewares/validateInput");

const router = require("express").Router();

router.route("/catalogue").post(getPropertiesFiltered);
router.route("/").get(getPropertiesTenant);
router.route("/create").post(validate(createPropertySchema) ,createProperty);
router.route("/:propertyId/deactivate").put(setIsActiveProperty);

module.exports = router;
