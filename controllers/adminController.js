const { getPropertiesAdmin } = require("../services/admin/properties/admin.property.service");
const { fetchDashboardMetrics } = require("../services/admin/metrics/admin.metrics.service")
const catchAsync = require("../utils/catchAsync");

const fetchPropertiesController = catchAsync(async (req, res) => {
        const {tenant} = req;
        
        const properties = await getPropertiesAdmin(tenant.id);
        
        return res.status(200).json({
            status: "success",
            data: properties
        })       

});

const fetchDashboardMetricsController = catchAsync(async (req, res) => {

        const {tenant} = req;

        const visits = fetchDashboardMetrics(tenant.id);

        return res.status(200).json({
            status: "success",
            data: properties
        })  
});

module.exports = {
    fetchPropertiesController
}