const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getAParticularUser,
} = require("../controllers/userController");

router.get("/", getAllUsers);
router.get("/:userName", getAParticularUser);

module.exports = router;
