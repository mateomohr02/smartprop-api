const catchAsync = require("../utils/catchAsync");
const { addProperty } = require("../services/property/property.service");

const createProperty = catchAsync(async (req,res,next) => {

    const property = await addProperty(req.body, req.tenant.id)

    res.status(201).json({
    status: "success",
    message: "Property Added Successfully",
    data: property,
  });
});

const getProperties = catchAsync(async(req,res,next) => {
  
})

const setActiveProperty = catchAsync(async (req,res,next) => {

});

const deleteProperty = catchAsync(async (req,res,next) => {

});

const modifyProperty = catchAsync(async (req,res,next) => {

});

module.exports = {
    createProperty
}
