const {
  createTenant,
  findTenantById,
  setInactive,
  addMetricsID
} = require("../controllers/tenantController");

const resolveTenant = require("../middlewares/resolveTenant");
const validateUser = require("../middlewares/validateUser");


const router = require("express").Router();

router.route("/:tenantIdParams/deactivate").put(resolveTenant, validateUser ,setInactive);
router.route("/create").post(createTenant);
router.route("/:tenantId").get(findTenantById);
router.route("/metrics/add").put(resolveTenant, validateUser , addMetricsID);

module.exports = router;
