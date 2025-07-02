const catchAsync = require("../utils/catchAsync");
const { addProperty, fetchPropertiesTenantId } = require("../services/property/property.service");

const createProperty = catchAsync(async (req,res,next) => {

    const property = await addProperty(req.body, req.tenant.id)

    res.status(201).json({
    status: "success",
    message: "Property Added Successfully",
    data: property,
  });
});

const getPropertiesTenant = catchAsync(async (req, res) => {

  console.log('REQUEST EN CONTROLLER', req.tenant);

  const tenantId = req.tenant.id;
  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;
  const offset = (page - 1) * limit;

  const properties = await fetchPropertiesTenantId(limit, page, offset, tenantId);
  res.status(200).json({ status: "success", data: properties });
});

module.exports = {
    createProperty,
    getPropertiesTenant
}
