const { EventMetric, Property, Post } = require("../../db/models");

const catchMetricService = async (metric, tenantId) => {
  
  console.log(metric, 'metric in service');  

};

module.exports = catchMetricService;