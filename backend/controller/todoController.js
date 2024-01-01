const TODO = require("../model/todo");
const { validationResult } = require("express-validator");

/// (POST) create a task ///
exports.createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { title, description, assignee } = req.body;
    const addTodo = new TODO({
      title,
      description,
      assignee,
    });
    if (!title || !description || !assignee) {
      res.status(404).json({ message: "Please fill all the fields" });
    }
    await addTodo.save();
    res.status(200);
    res.json({ message: "Task created!", addTodo });
  } catch (err) {
    res.status(500).json({ message: "server error", error: err });
  }
};

/// get all tasks ///
exports.getTasks = async (req, res) => {
  try {
    console.log("hjsgdkakd");
    const result = await TODO.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "server error", error: err });
  }
};

/// (GET) edit task ///
exports.editTask = async (req, res) => {
  const todoId = req.params.id;
  if (!todoId) {
    res.status(404).json({ message: "Not found" });
  }
  const singleTodo = await TODO.findById(todoId);
  res.json({ message: "single Todo", singleTodo: singleTodo });
};

/// (PATCH) update status and assignee ///
exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    if (!taskId) {
      res.status(404).json({ message: "Not found" });
    }
    const { assignee, status } = req.body;
    const result = await TODO.findByIdAndUpdate(taskId, {
      assignee,
      status,
    });
    res.json({ message: "edited successfully", result: result });
  } catch (err) {
    res.status(500).json({ message: "server error", error: err });
  }
};

/// Filter by Selected Assignee ///
exports.selectedAssignee = async (req, res) => {
  try {
    const { assignee } = req.params;
    if (assignee == "All") {
      const data = await TODO.find();
      res.json({ result: data, message: "filtered by all assignee" });
    } else {
      const data = await TODO.aggregate([{ $match: { assignee: assignee } }]);
      res.json({ result: data, message: "filtered by assignee" });
    }
  } catch (error) {
    res.status(500).json({ message: "server error", error: error });
  }
};

/// Delete a record by Id //
exports.deleteById = async (req, res) => {
  try {
    const { taskId } = req.params;
    if (!taskId) {
      res.status(404).json({ message: "Task not found" });
    }
    await TODO.deleteOne({ _id: taskId });
    res.status(200).json({ message: "Destroyed task" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "delete task failed!", error: error.message });
  }
};
