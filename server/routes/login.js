const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login = express.Router();
const jwtSecret = process.env.JWT_SECRET;

const User = require("../models/Users");

login
  .route("/login")

    .get(async(req,res)=>{
      try{
        const {UserToken}=req.cookies
        if(UserToken){
            jwt.verify(UserToken,jwtSecret,{},async(err,token)=>{
              if (err) {
                return res.status(401).json({ message: "Invalid token" });
              }
              res.status(200).json(token)
            })
        }
      }catch(err){
        console.error("Token check error:", error);
        res.status(500).json({ message: "Server error" });
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
            res.cookie("UserToken", token,{httpOnly:true}).status(200).json(userSearch);
          }
        );
      } else {
        return res.status(401).json({ message: "Invalid password" });
        // console.log("Password Incorrect");
      }
    } else {
      return res.status(401).json({ message: "User not found" })
      // console.log("User Doesn't Exist");
    }
  });

module.exports = login;
