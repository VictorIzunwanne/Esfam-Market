const express = require("express");
const router = express.Router();

const { signUserUp } = require("../controllers/signupController");

router.post("/", signUserUp);

module.exports = router;
