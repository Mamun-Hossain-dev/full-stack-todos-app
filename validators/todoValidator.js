const { body } = require("express-validator");

const createTodoValidator = [
  body("text")
    .notEmpty()
    .withMessage("text is required")
    .bail()
    .isLength({ min: 3 })
    .withMessage("text must be at least 3 characters long")
    .trim()
    .escape(),

  body("description")
    .optional()
    .isLength({ max: 300 })
    .withMessage("description can't be more than 300 characters")
    .trim()
    .escape(),

  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be either low, medium, or high"),

  body("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be a boolean value"),
];

const updateTodoValidator = [
  body("text")
    .optional()
    .isLength({ min: 3 })
    .withMessage("text must be at least 3 characters long")
    .trim()
    .escape(),

  body("description")
    .optional()
    .isLength({ max: 300 })
    .withMessage("description can't be more than 300 characters")
    .trim()
    .escape(),

  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be either low, medium, or high"),

  body("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be a boolean value"),
];

module.exports = {
  createTodoValidator,
  updateTodoValidator,
};
