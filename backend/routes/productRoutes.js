const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  addReview,
  getMenProducts,
  getWomenProducts,
  getProductsByCategory,
} = require("../controllers/productControllers");
const { createProduct } = require("../controllers/productControllers");

router.get("/", getAllProducts);
router.post("/", createProduct);
router.post("/:productId/reviews", addReview);
router.get("/men", getMenProducts);
router.get("/women", getWomenProducts);
router.get("/:productCategories", getProductsByCategory);

module.exports = router;
