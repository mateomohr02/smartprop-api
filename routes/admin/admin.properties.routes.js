const {
    fetchPropertiesController,
    fetchPropertyDetailController,
    putPropertyController,
    fetchPopertyTypesController,
    uploadMultimediaController
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

module.exports = router;
