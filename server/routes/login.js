const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login = express.Router();
const jwtSecret = process.env.JWT_SECRET;

const User = require("../models/Users");

login
  .route("/login")

    .get(async(req,res)=>{
        const {UserToken}=req.cookies
        if(UserToken){
            jwt.verify(UserToken,jwtSecret,{},async(err,token)=>{
                if(err)throw err;
                res.json(token)
            })
        }
    })

  .post(async (req, res) => {
    const { input } = req.body;
    const userSearch = await User.findOne({ email: input.email });
    if (userSearch) {
      const passwordVerify = bcrypt.compareSync(
        input.password,
        userSearch.password
      );
      if (passwordVerify) {
        jwt.sign(
          {
            id: userSearch.id,
            email: userSearch.email,
            username: userSearch.username,
          },
          jwtSecret,
          {},
          async (err, token) => {
            if (err) throw err;
            res.cookie("UserToken", token).json(userSearch);
          }
        );
      } else {
        console.log("Password Incorrect");
      }
    } else {
      console.log("User Doesn't Exist");
    }
  });

module.exports = login;
