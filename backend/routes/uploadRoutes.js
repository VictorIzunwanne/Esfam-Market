const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadImage } = require("../controllers/uploadController");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.array("files", 5), uploadImage);

module.exports = router;
