const {
  createTenant,
  findTenantById,
} = require("../controllers/tenantController");

const router = require("express").Router();

router.route("/create").post(createTenant);
router.route("/:tenantId").get(findTenantById);

module.exports = router;
