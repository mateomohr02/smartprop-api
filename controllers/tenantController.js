const { addTenant } = require("../services/tenant/tenant.service");

const createTenant = async (req, res, next) => {
  console.log(req.body, "BODY");

  const tenant = await addTenant(req.body);
  res.status(201).json({
    status: "success",
    message: "Tenant created successfully.",
    data: tenant,
  });
};

module.exports = {
  createTenant,
};
