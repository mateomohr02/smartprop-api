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
    data: properties,
  });
});

const fetchPropertyDetailController = catchAsync(async (req, res) => {
  const { propertyId } = req.params;
  const { tenant } = req;

  if (!tenant || !propertyId) {
    return res.status(400).json({
      status: "failure",
      message: "Faltan datos necesarios para realizar la petición",
    });
  }
  const propertyDetail = await getPropertyDetail(tenant.id, propertyId);

  return res.status(200).json({
    status: "success",
    data: propertyDetail,
  });
});

const putPropertyController = catchAsync(async (req, res) => {
  const { tenant } = req;
  const { body } = req;

  if (!tenant || !body) {
    return res.status(400).json({
      status: "failure",
      message: "Faltan datos necesarios para actualizar la propiedad",
    });
  }

  const propertyUpdated = await putProperty(tenant.id, body);

  return res.status(200).json({
    status: "success",
    data: propertyUpdated,
  });
});

const fetchPopertyTypesController = catchAsync(async (req, res) => {
  const { tenant } = req;

  if (!tenant) {
    return res.status(400).json({
      status: "failure",
      message: "Faltan datos necesarios para realizar la petición",
    });
  }

  const propertyTypes = await fetchPropertyTypes(tenant.id);

  return res.status(200).json({
    status: "success",
    data: propertyTypes,
  });
});

const uploadMultimediaController = async (req, res) => {
  try {
    const { tenant } = req;
    if (!tenant)
      return res.status(400).json({
        status: "failure",
        message: "Faltan datos necesarios",
      });

    if (!req.files || req.files.length === 0)
      return res.status(400).json({
        status: "failure",
        message: "No se recibieron archivos",
      });

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
    console.error("Error en uploadMultimediaController:", error);
    res.status(500).json({
      status: "failure",
      message: "Error al subir multimedia",
    });
  }
};

module.exports = {
  fetchPropertiesController,
  fetchPropertyDetailController,
  putPropertyController,
  fetchPopertyTypesController,
  uploadMultimediaController,
};
