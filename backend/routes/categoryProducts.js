const express = require("express");
const router = express.Router();
const { getCategory } = require("../controllers/categoryProducts");

router.get("/category/:clientReq", getCategory);

module.exports = router;
