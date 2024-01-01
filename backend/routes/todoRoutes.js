const express = require("express");
const todoController = require("../controller/todoController");
const router = express.Router();
const validation = require("../validation/validation");
const isAuth = require("../middelware/is-auth");

router.post(
  "/addtodo",
  isAuth,
  validation.validateTask(),
  todoController.createTask
);
router.get("/todos", todoController.getTasks);
router.get("/edit-todo/:id", todoController.editTask);
router.patch("/edit-todo/:id", todoController.updateTask);
router.get("/filter-todo/:assignee", todoController.selectedAssignee);
router.delete("/delete-todo/:taskId", todoController.deleteById);

module.exports = router;
