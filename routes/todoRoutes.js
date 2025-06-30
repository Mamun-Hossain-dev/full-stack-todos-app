const express = require("express");
const {
  getTodos,
  updateTodo,
  createTodo,
  deleteTodo,
} = require("../controllers/todoController");
const protect = require("../middlewares/authMiddleware");
const validateResult = require("../middlewares/validationMiddleware");
const {
  createTodoValidator,
  updateTodoValidator,
} = require("../validators/todoValidator");

const router = express.Router();

router.use(protect);

router.get("/", getTodos);
router.post("/", createTodoValidator, validateResult, createTodo);
router.put("/:id", updateTodoValidator, validateResult, updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
