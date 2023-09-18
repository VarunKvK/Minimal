const express = require("express");
const Task = require("../models/Tasks");

const editTaskRoute = express.Router();

editTaskRoute
  .route("/editTaskcreate/:id")

  .get(async(req,res)=>{
    const {id}=req.params;
    console.log({id})
    const data=await Task.findById(id)
    console.log(data)
    res.json(data)
  })
  
module.exports = editTaskRoute;