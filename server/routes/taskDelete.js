const express = require("express");
const Task = require("../models/Tasks");

const taskDeleteRoute = express.Router();

taskDeleteRoute
  .route("/taskdelete/:taskId")

  .delete(async (req, res) => {
    const { taskId } = req.params;
    try {
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }else{
          await task.deleteOne();
          res.status(200).json({ message: "Task deleted successfully" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
module.exports = taskDeleteRoute;
