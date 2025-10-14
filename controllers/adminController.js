const catchAsync = require("../utils/catchAsync");

const fetchPropertiesController = catchAsync(async (req, res) => {
        const {user, tenant} = req;
        
        console.log(user,'user', tenant, 'tenant');
        
});

module.exports = {
    fetchPropertiesController
}