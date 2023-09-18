const express = require("express");
const jwt = require("jsonwebtoken");
const Task = require("../models/Tasks");
const jwtSecret = process.env.JWT_SECRET;

const taskRoute = express.Router();

taskRoute
  .route("/taskcreate")

  .get(async(req,res)=>{
    const {id}=req.body;
    console.log({id})
    const data=await Task.findById(id)
    console.log(data)
    res.json(data)
  })

  .put(async(req,res)=>{
    const {id,task}=req.body
    console.log(task)
    const verifyId=await Task.findById(id)
    verifyId.set({
      tasktitle:task.tasktitle,
      todo:task.todoList
    })
    await verifyId.save()
  })
  .post(async (req, res) => {
    try {
      const { task } = req.body;
      const { UserToken } = req.cookies;
      
      if (UserToken) {
        jwt.verify(UserToken, jwtSecret, {}, async (err, token) => {
          if (err) throw err;

          await Task.create({
            tasker: token.id,
            tasktitle: task.tasktitle,
            todo: task.todoList,
          });
        });
      }else{
        console.log("Some issue with token")
      }
    } catch (err) {
      console.log(err);
    }
  });

module.exports = taskRoute;
