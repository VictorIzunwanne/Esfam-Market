const express = require("express");
const router = express.Router();
const { logUserIn } = require("../controllers/loginController");

router.post("/", logUserIn);

module.exports = router;
