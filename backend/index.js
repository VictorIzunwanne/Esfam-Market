const express = require("express");
const multer = require("multer");
const cloudinary = require("./cloudinary.config");
const { Readable } = require("stream");
const app = express();
const cors = require("cors");

app.use(cors());
const upload = multer({ storage: multer.memoryStorage() });

const streamUpload = (fileBuffer, filename) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "products", public_id: filename },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    const readable = Readable.from(fileBuffer);
    readable.pipe(stream);
  });
};

app.post("/upload", upload.array("files", 10), async (req, res) => {
  try {
    const uploadResults = await Promise.all(
      req.files.map((file) =>
        streamUpload(file.buffer, Date.now() + "-" + file.originalname)
      )
    );
    res.json(uploadResults); // contains URLs
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3060, () => console.log("Server running on http://localhost:3060"));
