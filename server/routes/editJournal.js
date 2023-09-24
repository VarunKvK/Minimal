const express = require("express");
const Journal = require("../models/Journal");

const editJournalRoute = express.Router();

editJournalRoute
  .route("/editJournalCreate/:id")

  .get(async(req,res)=>{
    const {id}=req.params;
    const data=await Journal.findById(id)
    res.json(data)
  })
  
module.exports = editJournalRoute;