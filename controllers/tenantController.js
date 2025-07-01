const { addTenant, findTenant } = require("../services/tenant/tenant.service");
const { addUser } = require("../services/user/user.service");

const createTenant = async (req, res, next) => {

  const tenant = await addTenant(req.body.tenant);

  console.log(tenant, 'TENANT CREATE TENANT');

  const firstUser = await addUser(req.body.user, tenant);

  res.status(201).json({
    status: "success",
    message: "Tenant & First User created successfully.",
    data: tenant, firstUser
  });
};

const findTenantById = async (req, res, next) => {
  const { tenantId } = req.params;

  const tenant = await findTenant(tenantId);

  res.status(201).json({
    status: "success",
    message: "Tenant found",
    data: tenant,
  });
};

module.exports = {
  createTenant,
  findTenantById,
};
