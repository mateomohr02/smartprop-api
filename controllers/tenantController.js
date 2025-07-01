const { 
  addTenant,
  findTenant
} = require("../services/tenant/tenant.service");

const createTenant = async (req, res, next) => {
  
  const tenant = await addTenant(req.body);
  res.status(201).json({
    status: "success",
    message: "Tenant created successfully.",
    data: tenant,
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
  findTenantById
};
