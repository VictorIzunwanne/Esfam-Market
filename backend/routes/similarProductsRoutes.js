const express = require("express");
const router = express.Router();
const {
  getSimilarProducts,
} = require("../controllers/similarProductController");

router.get("/products/:itemCategory", getSimilarProducts);

module.exports = router;
