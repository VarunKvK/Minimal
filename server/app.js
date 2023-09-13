require("dotenv").config()
const express=require("express");
const bodyParser=require("body-parser")
const bcrypt=require("bcrypt")
const cookieParser=require("cookie-parser")
const cors=require("cors")
const mongoose=require("mongoose")

const app=express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:true,credentials:true}))





app.listen(8000,()=>{
    console.log("Server Running on 8000")
})
