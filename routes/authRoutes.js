// external imports
const express = require("express");

// internal imports
const {
  register,
  login,
  refresh,
  logout,
} = require("../controllers/authController");
const {
  registerValidation,
  loginValidation,
} = require("../validators/authValidator");
const validateRequest = require("../middlewares/validationMiddleware");

const router = express.Router();

router.post("/register", registerValidation, validateRequest, register);
router.post("/login", loginValidation, validateRequest, login);
router.post("/logout", logout);
router.post("/refresh", refresh);

module.exports = router;
