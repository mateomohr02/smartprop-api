const {
  getPropertiesAdmin,
  getPropertyDetail,
  putProperty,
  fetchPropertyTypes,
} = require("../../services/admin/properties/admin.property.service");

const catchAsync = require("../../utils/catchAsync");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const fetchPropertiesController = catchAsync(async (req, res) => {
  const { tenant } = req;

  const properties = await getPropertiesAdmin(tenant.id);

  return res.status(200).json({
    status: "success",
    properties,
  });
});

const fetchPropertyDetailController = catchAsync(async (req, res) => {
  const { propertyId } = req.params;
  const { tenant } = req;

  if (!tenant || !propertyId) {
    return next(new AppError("Missing data for request.", 400))
  }
  const propertyDetail = await getPropertyDetail(tenant.id, propertyId);

  return res.status(200).json({
    status: "success",
    propertyDetail,
  });
});

const putPropertyController = catchAsync(async (req, res) => {
  const { tenant } = req;
  const { body } = req;

  if (!tenant || !body) {
    return next(new AppError("Missing data for request.", 400))
  }

  const propertyUpdated = await putProperty(tenant.id, body);

  return res.status(200).json({
    status: "success",
    propertyUpdated,
  });
});

const fetchPopertyTypesController = catchAsync(async (req, res) => {
  const { tenant } = req;

  if (!tenant) {
    return next(new AppError("Missing data for request.", 400))
  }

  const propertyTypes = await fetchPropertyTypes(tenant.id);

  return res.status(200).json({
    status: "success",
    propertyTypes,
  });
});

const uploadMultimediaController = async (req, res) => {
  try {
    const { tenant } = req;
    if (!tenant)
      return next(new AppError("Missing data for request.", 400))

    if (!req.files || req.files.length === 0)
      return next(new AppError("Missing files.", 400))

    // Función helper que envuelve upload_stream en una Promesa
    const uploadToCloudinary = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        );
        stream.end(fileBuffer);
      });
    };

    // Subir todos los archivos simultáneamente
    const uploaded = await Promise.all(
      req.files.map((file) => uploadToCloudinary(file.buffer))
    );

    res.status(200).json({ urls: uploaded });
  } catch (error) {
    return next(new AppError("Error while uploading multimedia.", 500))
  }
};

module.exports = {
  fetchPropertiesController,
  fetchPropertyDetailController,
  putPropertyController,
  fetchPopertyTypesController,
  uploadMultimediaController,
};
