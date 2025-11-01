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
    data: leads,
  });
});

const fetchLeadDetailController = catchAsync(async (req, res) => {
  const { leadId } = req.params;
  const { tenant } = req;

  if (!leadId || !tenant) {
    return res.status(400).json({
      message: "Faltan datos necesarios para obtener la consulta.",
    });
  }

  const lead = await fetchLeadDetail(tenant.id, leadId);

  return res.status(200).json({
    status: "success",
    data: lead,
  });
});

const putLeadStatusController = catchAsync(async (req, res) => {
  const { leadId } = req.params;
  const { status, metadata } = req.body;
  const { tenant, user } = req;

  if (!leadId) {
    return res.status(400).json({
      message: "No se envió el id de la consulta",
    });
  }

  if (!status) {
    return res.status(400).json({
      message: "No se envió el estado de la consulta",
    });
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
    data: lead,
  });
});

module.exports = {
  fetchLeadsController,
  putLeadStatusController,
  fetchLeadDetailController
};
