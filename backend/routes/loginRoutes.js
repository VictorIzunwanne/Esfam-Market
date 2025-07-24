const express = require("express");
const router = express.Router();
const { logUserIn } = require("../controllers/loginController");
const { logUserOut } = require("../controllers/loginController");

router.post("/login", logUserIn);
router.post("/logout", logUserOut);

module.exports = router;
