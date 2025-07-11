const catchAsync = require("../utils/catchAsync");
const {
  addProperty,
  fetchPropertiesTenantId,
  toggleIsActiveProperty,
  getFiltersForTenantService,
  fetchPropertiesSlugs,
  fetchActiveProperties,
  getPropertyDetailService
} = require("../services/property/property.service");
const { parseSlugToFilters } = require("../utils/parseSlugToFilters");

const createProperty = catchAsync(async (req, res, next) => {
  const property = await addProperty(req.body, req.tenant);

  res.status(201).json({
    status: "success",
    message: "Property Added Successfully",
    data: property,
  });
});

const getPropertiesTenant = catchAsync(async (req, res) => {
  const tenantId = req.tenant.id;
  const limit = Number(req.query.limit) || 15;
  const page = Number(req.query.page) || 1;
  const offset = (page - 1) * limit;

  const properties = await fetchPropertiesTenantId(
    limit,
    page,
    offset,
    tenantId
  );
  res.status(200).json({ status: "success", data: properties });
});

const setIsActiveProperty = catchAsync(async (req, res) => {
  const { propertyId } = req.params;
  const tenantId = req.tenant.id;
  const userId = req.user.id;

  const property = await toggleIsActiveProperty(propertyId, tenantId, userId);

  res.status(200).json({ status: "success", data: property });
});

const getPropertiesFiltered = catchAsync(async (req, res) => {
  const { slug } = req.params;

  const filters = parseSlugToFilters(slug); // función para convertir el slug a filtros reales

  const properties = await searchPropertiesService(filters);

  res
    .status(200)
    .json({ status: "success", results: properties.length, properties });
});

const getFiltersForTenant = catchAsync(async (req, res) => {
  const tenantId = req.tenant.id;
  const filters = await getFiltersForTenantService(tenantId);

  res.status(200).json({ status: "success", filters });
});


const getPropertiesSlugs = catchAsync( async (req,res,next) => {
  const tenantId = req.tenant.id;
  const slugs = await fetchPropertiesSlugs(tenantId);
  res.status(200).json(slugs);
}) 

const getActivePropertiesTenant  = catchAsync(async (req, res) => {
  const tenantId = req.tenant.id;
  const properties = await fetchActiveProperties(tenantId);
  res.status(200).json({ status: "success", properties });
});

const getPropertyDetail = catchAsync(async (req, res) => {
  const { propertySlug } = req.params;
  const property = await getPropertyDetailService(propertySlug, req.tenant.id);
  res.status(200).json({ status: "success", property });
});


module.exports = {
  createProperty,
  getPropertiesTenant,
  setIsActiveProperty,
  getPropertiesFiltered,
  getFiltersForTenant,
  getPropertiesSlugs,
  getActivePropertiesTenant,
  getPropertyDetail
};
