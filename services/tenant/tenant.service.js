const { Tenant } = require("../../db/models");
const AppError = require("../../utils/appError");
const { validateEmail } = require("../auth/auth.helpers");

const addTenant = async ({ name, email, domain }) => {
  if (!name || !email || !domain) {
    throw new AppError("Missing parameters to create a Tenant", 400);
  }

  if (!validateEmail(email)) {
    throw new AppError("Invalid email format.", 400);
  }

  const tenantExists = await Tenant.findOne({ where: { email } });

  if (tenantExists) {
    throw new AppError(
      `There is a Tenant already registered with email: ${email}`,
      409
    );
  }

  const newTenant = await Tenant.create({ name, email, domain });

  return newTenant;
};

const findTenant = async (id) => {
  if (!id) {
    throw new AppError("Missing id to find Tenant", 400);
  }

  const tenant = await Tenant.findByPk(id);

  if (!tenant) {
    throw new AppError(`Tenant not found id: ${id}`, 409);
  }

  return tenant;
};

const setInactiveTenant = async ({ tenantId, userId, tenantIdParams }) => {

console.log(tenantId, userId, tenantIdParams, 'DATA');


  if (!tenantId || !userId) {
    throw new AppError("Missing required data: tenantId or userId", 400);
  }

  if (tenantId !== tenantIdParams) {
    throw new AppError(
      `Tenant mismatch: Authenticated tenantId (${tenantId}) does not match param (${tenantIdParams})`,
      403
    );
  }

  const tenant = await Tenant.findByPk(tenantId);

  if (!tenant) {
    throw new AppError("Tenant not found", 404);
  }

  if (!tenant.active) {
    throw new AppError("Tenant is already inactive", 400);
  }

  tenant.active = false;
  await tenant.save();

  return tenant;
};

const updateMetricsIds = async (tenantId, { googleManagementSystemId, googleTagManagerId, metaPixelId }) => {
  
  const tenant = await Tenant.findByPk(tenantId);

  if (!tenant) {
    throw new AppError("Tenant not found", 404);
  }

  if (googleManagementSystemId !== undefined) {
    tenant.googleManagementSystemId = googleManagementSystemId;
  }

  if (googleTagManagerId !== undefined) {
    tenant.googleTagManagerId = googleTagManagerId;
  }

  if (metaPixelId !== undefined) {
    tenant.metaPixelId = metaPixelId;
  }

  await tenant.save();

  return tenant;
};

module.exports = {
  addTenant,
  findTenant,
  setInactiveTenant,
  updateMetricsIds
};
