const sharp = require("sharp");
const cloudinary = require("../config/cloudinary");
const { Readable } = require("stream");

const compressImage = async (fileBuffer) => {
  return sharp(fileBuffer)
    .resize({ width: 1000, height: 1000, fit: "inside" }) // resize to max 1000x1000
    .webp({ quality: 60 }) // or use .webp({ quality: 75 }) for WebP
    .toBuffer();
};

const streamUpload = (fileBuffer, filename) => {
  return new Promise(async (resolve, reject) => {
    try {
      const compressedBuffer = await compressImage(fileBuffer);

      const stream = cloudinary.uploader.upload_stream(
        { folder: "products", public_id: filename },
        (error, result) => {
          if (result) resolve(result);
          else reject(error);
        }
      );

      const readable = Readable.from(compressedBuffer);
      readable.pipe(stream);
    } catch (err) {
      reject(err);
    }
  });
};

exports.uploadImage = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files provided" });
    }

    const uploadResults = await Promise.all(
      req.files.map((file) =>
        streamUpload(file.buffer, Date.now() + "-" + file.originalname)
      )
    );

    const uploaded = uploadResults.map((result) => ({
      url: result.secure_url,
      public_id: result.public_id,
    }));

    return res.status(200).json({ uploaded });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ error: err.message });
  }
};
