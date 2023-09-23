const express = require("express");
const jwt = require("jsonwebtoken");
const Task = require("../models/Tasks");
const jwtSecret = process.env.JWT_SECRET;

const taskRoute = express.Router();

taskRoute
  .route("/taskcreate")

  .get(async(req,res)=>{
    const {id}=req.body;

    if(id){
      const data=await Task.findById(id)
      res.status(200).json(data)
    }else{
      res.status(500).json({ message: "Server error" });
    }
  })

  .put(async(req,res)=>{
    const {id,task}=req.body
    if(id){
      const verifyId=await Task.findById(id)
      if(verifyId){
        verifyId.set({
          tasktitle:task.tasktitle,
          todo:task.todoList
        })
        await verifyId.save()
        res.status(200).json({ message: "Id is found" })
      }else{
        console.log("The id is not found in TaskModule")
        res.status(500).json({ message: "Id is not found" })
      }
    }
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
