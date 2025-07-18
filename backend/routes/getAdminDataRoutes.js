const express = require("express");
const router = express.Router();
const { getAdminData } = require("../controllers/getAdminDataController");

router.get("/", getAdminData);

module.exports = router;
