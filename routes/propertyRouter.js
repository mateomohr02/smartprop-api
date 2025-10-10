const { createProperty, getPropertiesTenant, setIsActiveProperty, getPropertiesFiltered, getFiltersForTenant,getPropertyDetail, getPropertiesSlugs, getActivePropertiesTenant, getHighlightedProperties } = require("../controllers/propertyController");

const { createPropertySchema } = require("../schemas/property.schema");
const validate = require("../middlewares/validateInput");

const router = require("express").Router();

router.route("/detail/:propertySlug").get(getPropertyDetail)
router.route("/slugs").get(getPropertiesSlugs);
router.route("/catalogue/:filterSlug").get(getPropertiesFiltered);
router.route("/").get(getPropertiesTenant);
router.route("/active").get(getActivePropertiesTenant);
router.route("/create").post(validate(createPropertySchema) ,createProperty);
router.route("/:propertyId/deactivate").put(setIsActiveProperty);
router.route("/filters").get(getFiltersForTenant)
router.route("/highlights").get(getHighlightedProperties)
module.exports = router;
