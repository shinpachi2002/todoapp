const mongoose=require("mongoose")

const TaskSchema=new mongoose.Schema({
     title:{
        type:String,
        required:true,
     },
     description:{
        type:String,
        required:true
     },
     status:{
        type:String,
        required:true
     },
     userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
     }

})

const TaskModel=mongoose.model("Task",TaskSchema)

module.exports=TaskModel