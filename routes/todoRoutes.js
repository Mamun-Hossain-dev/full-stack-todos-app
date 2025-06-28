const express = require("express");
const {
  getTodos,
  updateTodo,
  createTodo,
  deleteTodo,
} = require("../controllers/todoController");
const protect = require("../middlewares/authMiddleware");
const validateResult = require("../middlewares/validationMiddleware");
const todoValidator = require("../validators/todoValidator");

const router = express.Router();

router.use(protect);

router.get("/", getTodos);
router.post("/", todoValidator, validateResult, createTodo);
router.put("/:id", todoValidator, validateResult, updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
