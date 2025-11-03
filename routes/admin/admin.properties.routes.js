const {
    createPropertyController,
    addPropertyLocationController,
    fetchPropertiesController,
    fetchPropertyDetailController,
    putPropertyController,
    fetchPopertyTypesController,
    uploadMultimediaController,
    addPropertyDataController,
} = require("../../controllers/admin/admin.properties.controller");

const router = require("express").Router();

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.route("").get(fetchPropertiesController);
router.route("/detail/:propertyId").get(fetchPropertyDetailController);
router.route("/edit").put(putPropertyController);
router.route("/types").get(fetchPopertyTypesController);
router.route("/characteristics").get();
router.route("/multimedia/upload").post(upload.array("files", 10), uploadMultimediaController);
router.route("/create").post(createPropertyController);
router.route("/add/data/:propertyId").put(addPropertyDataController);
router.route("/add/location/:propertyId").put(addPropertyLocationController);
router.route("/add/multimedia/:propertyId").post();
router.route("/add/characteristics/:propertyId").post();
router.route("/add/comodities/:propertyId").post();
router.route("/add/rooms/:propertyId").post();
router.route("/publish/:propertyId").put();


module.exports = router;
