const { Lead } = require("../../../db/models");
const AppError = require("../../../utils/appError");

const putLeadStatusService = async (tenantId, user, leadId, status, metadata = null) => {
  if (!tenantId || !user || !leadId || !status) {
    throw new AppError("Faltan datos necesarios para actualizar la consulta");
  }

  const lead = await Lead.findOne({
    where: {
      tenantId,
      id: leadId,
    },
  });

  if (!lead) {
    throw new AppError("No se encontró la consulta");
  }

  // Normalizamos el objeto metadata actual (por si no existe)
  const currentMetadata = lead.metadata ? { ...lead.metadata } : {};

  switch (status) {
    case "seen":
      lead.status = "seen";
      break;

    case "replied":
      lead.status = "replied";
      currentMetadata.repliedBy = {
        id: user.id,
        name: user.name || user.email,
        date: new Date().toISOString(),
      };
      break;

    case "dismissed":
      lead.status = "dismissed";
      currentMetadata.dismissedBy = {
        id: user.id,
        name: user.name || user.email,
        date: new Date().toISOString(),
      };
      break;

    default:
      throw new AppError(`Estado no válido: ${status}`);
  }

  lead.metadata = currentMetadata;
  await lead.save();

  return lead;
};

const fetchLeadDetail = async (tenantId, leadId) => {

  const lead = await Lead.findOne({
    where: {
      tenantId,
      id: leadId,
    },
  });

  if (!lead) {
    throw new AppError("No se encontró la consulta");
  }

  return lead;

}

const fetchLeads = async (tenantId) => {
    const leads = await Lead.findAll({
      where: {
        tenantId
      },
      order: [
        ["createdAt", "DESC"]
      ]
});

    return leads;
}

module.exports = {
    putLeadStatusService,
    fetchLeadDetail,
    fetchLeads
}