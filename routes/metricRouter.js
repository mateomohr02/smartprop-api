const { receiveMetric, updateHeatProperties } = require("../controllers/metricController");
const validate = require("../middlewares/validateInput");
const { metricSchema } = require("../schemas/metric.schema");

const router = require("express").Router();

router.route("/new").post(validate(metricSchema), receiveMetric);
router.route("/heat/update").get(updateHeatProperties);

module.exports = router;
