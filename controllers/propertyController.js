const catchAsync = require("../utils/catchAsync");
const { addProperty, fetchPropertiesTenantId, toggleIsActiveProperty, fetchFilterdProperties } = require("../services/property/property.service");

const createProperty = catchAsync(async (req,res,next) => {

    const property = await addProperty(req.body, req.tenant)

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

const getPropertiesFiltered = catchAsync( async (req, res) => {

    let filter;

    if (req.query.filter) {
      filter = req.body;
    }

    const { id } = req.tenant

    const properties = fetchFilterdProperties(filter, id);

    res.status(200).json({
    status: "success",
    results: properties.length,
    data: {
      properties,
    },
  });
})

module.exports = {
    createProperty,
    getPropertiesTenant,
    setIsActiveProperty,
    getPropertiesFiltered
}
