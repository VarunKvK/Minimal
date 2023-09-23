const express = require("express");
const Task = require("../models/Tasks");

const completeRoute = express.Router();

completeRoute
  .route("/completeTask/:id")

  .put(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const verifyId = await Task.findById(id);
    if (!verifyId) {
      return res.status(404).json({ message: "Task not found" });
    }
    const todoItem = verifyId.todo.find((item) => item === name);
    if (!todoItem) {
      return res
        .status(400)
        .json({ message: "Todo item not found in the task" });
    }

    await verifyId.save();
    return res.status(200).json({ message: "Task marked as complete" });
  });

module.exports = completeRoute;
