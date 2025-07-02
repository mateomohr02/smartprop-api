const {
  createTenant,
  findTenantById,
  setInactive,
} = require("../controllers/tenantController");

const resolveTenant = require("../middlewares/resolveTenant");
const validateUser = require("../middlewares/validateUser");


const router = require("express").Router();

router.route("/:tenantIdParams/deactivate").put(resolveTenant, validateUser ,setInactive);
router.route("/create").post(createTenant);
router.route("/:tenantId").get(findTenantById);

module.exports = router;
