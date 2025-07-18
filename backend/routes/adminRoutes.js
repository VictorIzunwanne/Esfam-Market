const express = require("express");
const router = express.Router();
const { logAdmin } = require("../controllers/adminController");

router.post("/", logAdmin);

module.exports = router;
