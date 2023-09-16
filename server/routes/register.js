const express=require("express")
const bcrypt=require("bcrypt")
const User=require("../models/Users")
const registerRoute=express.Router()

//Password Encryptor
const salt=bcrypt.genSaltSync(10)
registerRoute.route("/register")


.post(async(req,res)=>{
    const {input}=req.body;
    await User.create({
        email:input.email,
        username:input.username,
        password:bcrypt.hashSync(input.password,salt)
    }) 

})

module.exports=registerRoute
