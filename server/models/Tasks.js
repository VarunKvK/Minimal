const mongoose=require("mongoose")
const Users=require("./Users")

const taskSC=new mongoose.Schema({
    tasker:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    tasktitle:{type:String,unique:true,required:true},
    todo:[String]
})

const Task=new mongoose.model("Task",taskSC)

module.exports=Task