const express = require("express");
const Task = require("../models/Tasks");

const editTaskRoute = express.Router();

editTaskRoute
  .route("/editTaskcreate/:id")

  .get(async(req,res)=>{
    const {id}=req.params;
    const data=await Task.findById(id)
    res.json(data)
  })
  
module.exports = editTaskRoute;