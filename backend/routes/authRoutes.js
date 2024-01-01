const express = require("express");
const router = express.Router();
const validation = require("../validation/validation");

const authController = require("../controller/authController");

router.post("/signup", validation.validateSignupUser(), authController.signup);
router.post("/login", authController.login);

module.exports = router;
