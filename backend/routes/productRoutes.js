const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getParticularProduct,
  addReview,
  getMenProducts,
  getWomenProducts,
  getProductsByCategory,
} = require("../controllers/productControllers");
const { createProduct } = require("../controllers/productControllers");
const { loginMiddleware } = require("../middleware/loginMiddleware");

router.get("/", getAllProducts);
router.get("/specific/:itemId", loginMiddleware, getParticularProduct);
router.post("/", createProduct);
router.post("/:productId/reviews", loginMiddleware, addReview);
router.get("/men", getMenProducts);
router.get("/women", getWomenProducts);
router.get("/:productCategories", getProductsByCategory);

module.exports = router;
