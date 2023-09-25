const express = require("express");
const jwt = require("jsonwebtoken");
const Task = require("../models/Tasks");
const jwtSecret = process.env.JWT_SECRET;

const taskRoute = express.Router();

taskRoute
  .route("/taskcreate")

  .get(async (req, res) => {
    const { id } = req.body;

    if (id) {
      const data = await Task.findById(id);
      res.status(200).json(data);
    } else {
      res.status(500).json({ message: "Server error" });
    }
  })

  .put(async (req, res) => {
    const { id, tasktitle, todoList } = req.body;
    console.log({ todoList });
    if (id) {
      try {
        const existingTask = await Task.findById(id);
        console.log(existingTask);
        if (!existingTask) {
          return res.status(404).json({ message: "Task not found" });
        }

        const combinedTodos = [
          ...todoList.map((resp) => ({
            name: typeof resp === 'object' ? resp.name : resp,
            completed: false,
          })),
        ];
  
        await existingTask.set({
          tasktitle: tasktitle,
          todo: combinedTodos,
        });

        await existingTask.save();

        return res.status(200).json({ message: "Task updated successfully" });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
      }
    } else {
      return res.status(400).json({ message: "Invalid request" });
    }
  })

  .post(async (req, res) => {
    try {
      const { tasktitle, todoList } = req.body;
      const { UserToken } = req.cookies;

      if (UserToken) {
        jwt.verify(UserToken, jwtSecret, {}, async (err, token) => {
          if (err) throw err;
          await Task.create({
            tasker: token.id,
            tasktitle: tasktitle,
            todo: todoList.map((item) => ({
              name: item,
              completed: false,
            })),
          });
          res.status(201).json({ message: "Task created successfully" });
        });
      } else {
        console.log("Some issue with token");
        res.status(401).json({ message: "Unauthorized" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

module.exports = taskRoute;
