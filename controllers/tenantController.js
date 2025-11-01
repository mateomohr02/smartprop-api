const AppError = require("../utils/appError");
const { addTenant, findTenant, setInactiveTenant, updateMetricsIds } = require("../services/tenant/tenant.service");
const { addUser } = require("../services/user/user.service");
const catchAsync = require("../utils/catchAsync");

const createTenant = catchAsync(async (req, res, next) => {
  const tenant = await addTenant(req.body.tenant);
  const firstUser = await addUser(req.body.user, tenant);

  res.status(201).json({
    status: "success",
    data: { tenant, firstUser },
  });
});

const findTenantById = catchAsync(async (req, res, next) => {
  const { tenantId } = req.params;
  const tenant = await findTenant(tenantId);

  res.status(200).json({
    status: "success",
    tenant,
  });
});

const setInactive = catchAsync(async (req, res, next) => {
  const { tenantIdParams } = req.params;
  const tenantId = req.tenant.id;
  const userId = req.user.id;

  const updatedTenant = await setInactiveTenant({ tenantId, userId, tenantIdParams });

  res.status(200).json({
    status: "success"
  });
});

const addMetricsID = catchAsync(async (req, res, next) => {

  const { googleManagementSystemId, googleTagManagerId, metaPixelId } = req.body;
  const tenantId = req.tenant.id;

  const updatedTenant = await updateMetricsIds(tenantId, {
    googleManagementSystemId,
    googleTagManagerId,
    metaPixelId,
  });

  res.status(200).json({
    status: "success",
    updatedTenant,
  });

})

module.exports = {
  createTenant,
  findTenantById,
  setInactive,
  addMetricsID
};
