const {
  getPropertiesAdmin,
  putProperty,
  fetchPropertyTypes,
} = require("../services/admin/properties/admin.property.service");
const {
  fetchDashboardMetrics,
  fetchLeads,
} = require("../services/admin/metrics/admin.metrics.service");

const {
  putLeadStatusService,
  getLead,
} = require("../services/admin/leads/admin.leads.service");

const catchAsync = require("../utils/catchAsync");
const {
  fetchLocations,
  getLatLngFromGoogleMapsUrl,
} = require("../services/admin/location/admin.location.service");

const {
  fetchComodities
} = require("../services/admin/comodities/admin.comodities.service")

const {
  fetchCharacteristics
} = require("../services/admin/characteristics/admin.characteristics.service")


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
});

const putPropertyController = catchAsync(async (req, res) => {
  const { tenant } = req;
  const { body } = req;

  if (!tenant || !body) {
    return res.status(400).json({
      message: "Faltan datos necesarios para actualizar la propiedad",
    });
  }

  const propertyUpdated = await putProperty(tenant.id, body);

  return res.status(200).json({
    status: "success",
    data: propertyUpdated,
  });
});

const fetchPopertyTypesController = catchAsync(async (req, res) => {
  const { tenant } = req;

  if (!tenant) {
    return res.status(400).json({
      message: "Faltan datos necesarios para realizar la petición",
    });
  }

  const propertyTypes = await fetchPropertyTypes(tenant.id);

  return res.status(200).json({
    status: "success",
    data: propertyTypes,
  });
});

const fetchLocationsController = catchAsync(async (req, res) => {
  const upperLocation =
    req.body && Object.keys(req.body).length > 0 ? req.body : null;

  const locations = await fetchLocations(upperLocation);

  return res.status(200).json({
    status: "success",
    data: locations,
  });
});

const parseMapLocation = catchAsync(async (req, res) => {
    
  const { url } = req.body;

  const location = await getLatLngFromGoogleMapsUrl(url);

  return res.status(200).json({
    status: "success",
    data: location,
  });
});

const fetchComoditiesController = catchAsync( async (req, res) => {

  const { tenant } = req;

  if (!tenant) {
    return res.status(400).json({
      message: "Faltan datos necesarios para realizar la petición",
    });
  }

  const comodites = await fetchComodities(tenant.id);

  return res.status(200).json({
    status: "success",
    data: comodites,
  });
});

const fetchCharacteristicsController = catchAsync( async (req, res) => {

  const { tenant } = req;

  if (!tenant) {
    return res.status(400).json({
      message: "Faltan datos necesarios para realizar la petición",
    });
  }

  const characteristics = await fetchCharacteristics(tenant.id);

  return res.status(200).json({
    status: "success",
    data: characteristics,
  });



})

module.exports = {
  fetchPopertyTypesController,
  fetchPropertiesController,
  fetchDashboardMetricsController,
  fetchDashboardLeadsController,
  putStatusLeadController,
  fetchLeadDetailController,
  putPropertyController,
  fetchLocationsController,
  parseMapLocation,
  fetchComoditiesController,
  fetchCharacteristicsController
};
