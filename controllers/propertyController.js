const catchAsync = require("../utils/catchAsync");
const { addProperty, fetchPropertiesTenantId, toggleIsActiveProperty } = require("../services/property/property.service");

const createProperty = catchAsync(async (req,res,next) => {

    const property = await addProperty(req.body, req.tenant.id)

    res.status(201).json({
    status: "success",
    message: "Property Added Successfully",
    data: property,
  });
});

const getPropertiesTenant = catchAsync(async (req, res) => {

  const tenantId = req.tenant.id;
  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;
  const offset = (page - 1) * limit;

  const properties = await fetchPropertiesTenantId(limit, page, offset, tenantId);
  res.status(200).json({ status: "success", data: properties });
});

const setIsActiveProperty = catchAsync(async (req, res) => {
  const { propertyId } = req.params;
  const tenantId = req.tenant.id;
  const userId = req.user.id;

  const property = await toggleIsActiveProperty(propertyId, tenantId, userId);

  res.status(200).json({ status: "success", data: property });
})

const getCatalogue = catchAsync( async (req, res) => {
    const {filter} = req.body;
    
})

module.exports = {
    createProperty,
    getPropertiesTenant,
    setIsActiveProperty
}
