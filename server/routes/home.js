const express = require("express");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const Task = require("../models/Tasks");
const home = express.Router();

home
  .route("/home")

  .get(async (req, res) => {
    const { UserToken } = req.cookies;
    try {
      if (UserToken) {
        jwt.verify(UserToken, jwtSecret, {}, async (err, token) => {
          const id=token.id 
          const verified=await Task.find({ tasker:id})

          if(verified){
            res.json(verified)
          }
        });
      } else {
        console.log("There is an error with token");
      }
    } catch (err) {
      console.log(err);
    }
  });

module.exports = home;
