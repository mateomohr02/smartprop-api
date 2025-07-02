const { Tenant } = require("../db/models");
const AppError = require("../utils/appError");
const { validateUUID } = require("../utils/validators");

const resolveTenant = async (req, res, next) => {
  const tenantId = req.headers["x-tenant-id"];

  if (!tenantId || !validateUUID(tenantId)) {
    return next(new AppError("Invalid or missing tenant ID", 400));
  }

  const tenant = await Tenant.findByPk(tenantId);

  if (!tenant) {
    return next(new AppError("Tenant not found", 404));
  }
  
  req.tenant = tenant;
  next();
};

module.exports = resolveTenant;
