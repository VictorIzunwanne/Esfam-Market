const express = require("express");
const router = express.Router();
const { loginMiddleware } = require("../middleware/loginMiddleware");
const {
  getAllUsers,
  addProductToCart,
  getParticularUser,
  getUserCart,
} = require("../controllers/userController");

router.get("/me", loginMiddleware, (req, res) => {
  res.status(200).json(req.user);
});
router.get("/", getAllUsers);
router.get("/:userName", loginMiddleware, getParticularUser);
router.post("/:userName/cart", loginMiddleware, addProductToCart);
router.get("/:userName/getCart", loginMiddleware, getUserCart);

module.exports = router;
