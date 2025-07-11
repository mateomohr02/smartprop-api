const { receiveMetric } = require("../controllers/metricController");
const validate = require("../middlewares/validateInput");
const { metricSchema } = require("../schemas/metric.schema");
const router = require("express").Router();

router.route("/metric").post(validate(metricSchema), receiveMetric);

module.exports = router;
