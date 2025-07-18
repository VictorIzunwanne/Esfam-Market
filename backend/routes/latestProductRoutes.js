const express = require("express");
const router = express.Router();
const { getLatestProducts } = require("../controllers/latestProductController");

router.get("/", getLatestProducts);

module.exports = router;
