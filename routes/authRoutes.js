// external imports
const express = require("express");

// internal imports
const {
  register,
  login,
  refresh,
  logout,
  getMe,
} = require("../controllers/authController");
const {
  registerValidation,
  loginValidation,
} = require("../validators/authValidator");
const validateRequest = require("../middlewares/validationMiddleware");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerValidation, validateRequest, register);
router.post("/login", loginValidation, validateRequest, login);
router.post("/logout", logout);
router.post("/refresh", refresh);
router.get("/me", protect, getMe);

module.exports = router;
