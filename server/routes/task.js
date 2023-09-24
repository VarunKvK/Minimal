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
    const { id, tasktitle,todoList } = req.body;
    if (id) {
      const verifyId = await Task.findById(id);
      const transformedTodoList = todoList.map((item) => ({
        name: item,
        completed: false,
      }));
      if (verifyId) {
        verifyId.set({
          tasktitle: tasktitle,
          todo: transformedTodoList,
        });
        await verifyId.save();
        res.status(200).json({ message: "Task updated successfully" });
      } else {
        console.log("The id is not found in TaskModule");
        res.status(500).json({ message: "Id is not found" });
      }
    }
  })

  .post(async (req, res) => {
    try {
      const { tasktitle,todoList } = req.body;
      const { UserToken } = req.cookies;

      if (UserToken) {
        jwt.verify(UserToken, jwtSecret, {}, async (err, token) => {
          if (err) throw err;
          const transformedTodoList = todoList.map((item) => ({
            name: item,
            completed: false,
          }));
          await Task.create({
            tasker: token.id,
            tasktitle: tasktitle,
            todo: transformedTodoList,
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
