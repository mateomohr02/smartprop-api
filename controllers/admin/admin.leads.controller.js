const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");

const {
  fetchLeads,
  fetchLeadDetail,
  putLeadStatusService
} = require("../../services/admin/leads/admin.leads.service");

const fetchLeadsController = catchAsync(async (req, res) => {
  const { tenant } = req;
  const leads = await fetchLeads(tenant.id);
  return res.status(200).json({
    status: "success",
    leads,
  });
});

const fetchLeadDetailController = catchAsync(async (req, res) => {
  const { leadId } = req.params;
  const { tenant } = req;

  if (!leadId || !tenant) {
    return next(new AppError("Missing data for request.", 400))
  }

  const lead = await fetchLeadDetail(tenant.id, leadId);

  return res.status(200).json({
    status: "success",
    lead,
  });
});

const putLeadStatusController = catchAsync(async (req, res) => {
  const { leadId } = req.params;
  const { status, metadata } = req.body;
  const { tenant, user } = req;

  if (!leadId) {
    return next(new AppError("Missing data for request.", 400))
  }

  if (!status) {
    return next(new AppError("Missing data for request.", 400))
  }

  const lead = await putLeadStatusService(
    tenant.id,
    user,
    leadId,
    status,
    metadata
  );

  return res.status(200).json({
    status: "success",
    lead,
  });
});

module.exports = {
  fetchLeadsController,
  putLeadStatusController,
  fetchLeadDetailController
};
