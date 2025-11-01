const {
  fetchLeadsController,
  fetchLeadDetailController,
  putLeadStatusController,
} = require("../../controllers/admin/admin.leads.controller");

const router = require("express").Router();

router.route("").get(fetchLeadsController);

router.route("/:leadId").get(fetchLeadDetailController);

router.route("/:leadId").put(putLeadStatusController);

module.exports = router;
