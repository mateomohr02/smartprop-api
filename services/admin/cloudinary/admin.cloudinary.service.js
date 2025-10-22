const cloudinary = require("cloudinary").v2;

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadSingle = async (filePath) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  const result = await cloudinary.uploader.upload(filePath, options);
  return { url: result.secure_url };
};

const uploadImagesInBatches = async (filePaths, batchSize = 5) => {
  const results = [];
  for (let i = 0; i < filePaths.length; i += batchSize) {
    const batch = filePaths.slice(i, i + batchSize);
    const uploadedBatch = await Promise.all(batch.map(uploadSingle));
    results.push(...uploadedBatch);
  }
  return results;
};

module.exports = { uploadImagesInBatches };
