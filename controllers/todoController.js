const Todo = require("../models/Todo");

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.json(todos);
  } catch (err) {
    console.log(err);
    console.log(err);
    res.status(500).json({ msg: "Failed to get the todos" });
  }
};

const createTodo = async (req, res) => {
  try {
    const { text, description, priority } = req.body;
    const todo = await Todo.create({
      user: req.user._id,
      text,
      description,
      priority,
    });
    res.status(201).json(todo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Failed to create todo" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo || req.user._id.toString() !== todo.user.toString()) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    todo.text = req.body.text ?? todo.text;
    todo.description = req.body.description ?? todo.description;
    todo.priority = req.body.priority ?? todo.priority;
    todo.completed =
      req.body.completed !== undefined ? req.body.completed : todo.completed;

    await todo.save();
    res.json(todo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Failed to update todo" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo || todo.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    await todo.deleteOne();
    res.json({ msg: "Todo deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Failed to delete todo" });
  }
};

module.exports = {
  getTodos,
  updateTodo,
  createTodo,
  deleteTodo,
};
