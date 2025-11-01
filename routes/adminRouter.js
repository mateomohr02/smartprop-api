const adminPropertiesRouter = require("./admin/admin.properties.routes");
const adminComoditesRotuer = require("./admin/admin.comodities.routes");
const adminCharacteristicsRouter = require("./admin/admin.characteristics.routes");
const adminPlacesRouter = require("./admin/admin.places.routes");
const adminMetricsRouter = require("./admin/admin.metrics.routes");
const adminLeadsRouter = require("./admin/admin.leads.routes");
const adminRoomsRouter = require("./admin/admin.rooms.route");

const router = require("express").Router();

router.use("/properties", adminPropertiesRouter);
router.use("/comodities", adminComoditesRotuer);
router.use("/characteristics", adminCharacteristicsRouter);
router.use("/places", adminPlacesRouter);
router.use("/metrics", adminMetricsRouter);
router.use("/leads", adminLeadsRouter);
router.use("/rooms", adminRoomsRouter);

module.exports = router;
