const {
  getPropertiesAdmin,
} = require("../services/admin/properties/admin.property.service");
const {
  fetchDashboardMetrics,
  fetchLeads,
} = require("../services/admin/metrics/admin.metrics.service");

const {
  putLeadStatusService,
  getLead
} = require("../services/admin/leads/admin.leads.service");

const catchAsync = require("../utils/catchAsync");

const fetchPropertiesController = catchAsync(async (req, res) => {
  const { tenant } = req;

  const properties = await getPropertiesAdmin(tenant.id);

  return res.status(200).json({
    status: "success",
    data: properties,
  });
});

const fetchDashboardMetricsController = catchAsync(async (req, res) => {
  const { tenant } = req;
  const metrics = await fetchDashboardMetrics(tenant.id);
  return res.status(200).json({ status: "success", data: metrics });
});

const fetchDashboardLeadsController = catchAsync(async (req, res) => {
  const { tenant } = req;
  const leads = await fetchLeads(tenant.id);
  return res.status(200).json({
    status: "success",
    data: leads,
  });
});

const putStatusLeadController = catchAsync(async (req, res) => {
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

  const lead = await putLeadStatusService(tenant.id, user, leadId, status, metadata);

  return res.status(200).json({
    status: "success",
    data: lead,
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

  const lead = await getLead(tenant.id, leadId);

  return res.status(200).json({
    status: "success",
    data: lead,
  });

})

module.exports = {
  fetchPropertiesController,
  fetchDashboardMetricsController,
  fetchDashboardLeadsController,
  putStatusLeadController,
  fetchLeadDetailController
};
