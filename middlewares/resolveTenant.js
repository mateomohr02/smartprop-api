const { Tenant } = require("../db/models");
const AppError = require("../utils/appError");

const resolveTenant = async (req, res, next) => {
  const tenantId = req.headers["x-tenant-id"];

  if (!tenantId) {
    return next(new AppError("Tenant ID is missing from headers", 400));
  }

  const tenant = await Tenant.findByPk(tenantId);

  if (!tenant || !tenant.active) {
    return next(new AppError("Tenant not found or inactive", 404));
  }

  req.tenant = tenant;
  next();
};

module.exports = resolveTenant;
