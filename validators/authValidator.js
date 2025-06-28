const { body } = require("express-validator");

const registerValidation = [
  body("name")
    .notEmpty()
    .trim()
    .escape()
    .withMessage("name is required")
    .bail()
    .isLength({ min: 3 })
    .withMessage("name must be at least 3 characters"),

  body("email")
    .notEmpty()
    .withMessage("email is required")
    .bail()
    .isEmail()
    .withMessage("must be a valid email"),

  body("password")
    .notEmpty()
    .withMessage("password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters"),
];

const loginValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Must be a valid email"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

module.exports = {
  registerValidation,
  loginValidation,
};
