const express = require("express");
const router = express.Router();
const { loginMiddleware } = require("../middleware/loginMiddleware");
const {
  getAllUsers,
  addProductToCart,
  getParticularUser,
  getUserCart,
  deleteProductFromCart,
} = require("../controllers/userController");

router.get("/me", loginMiddleware, (req, res) => {
  res.status(200).json(req.user);
});
router.get("/", getAllUsers);
router.get("/:userName", loginMiddleware, getParticularUser);
router.post("/:userName/cart", loginMiddleware, addProductToCart);
router.delete("/:userName/cart", loginMiddleware, deleteProductFromCart);
router.get("/:userName/getCart", loginMiddleware, getUserCart);

module.exports = router;
