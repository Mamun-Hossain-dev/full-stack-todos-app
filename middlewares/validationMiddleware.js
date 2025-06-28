const { validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("validation errors", errors.array());
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err) => ({
        field: err?.path || null,
        message: err.msg,
      })),
    });
  }
  next();
};

module.exports = validateRequest;
