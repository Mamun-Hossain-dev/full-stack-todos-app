// external imports
const express = require("express");

// internal imports
const User = require("../models/User");
const { register, login } = require("../controllers/authController");
const {
  registerValidation,
  loginValidation,
} = require("../validators/authValidator");
const validateRequest = require("../middlewares/validationMiddleware");

const router = express.Router();

router.post("/register", registerValidation, validateRequest, register);
router.post("/login", loginValidation, validateRequest, login);

module.exports = router;
