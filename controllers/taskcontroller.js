const mongoose=require('mongoose')
const TaskModel=require("../models/taskmodel")

const addtask=async (req,res)=>{
    req.body.userid=req.user.id
    try {
        const task=await TaskModel.create(req.body)
        res.status(201).json(task)
    } catch (error) {
        res.status(400).json(error)
    }
}
const gettask=async (req,res)=>{
    const userid=req.user.id
    try {
        const tasks=await TaskModel.find({userid})
        res.status(201).json(tasks)
    } catch (error) {
        res.status(400).json(error)
    }
}
const gettaskbyid=async (req,res)=>{
    const {id}=req.params
    const userid=req.user.id
    try {
        const task=await TaskModel.findOne({"_id":id})
        if(task){
            if(userid===task.userid.toString()){
                res.status(201).json(task)
            }
            else{
                res.status(400).json({"message":"You dont have Access to this task"})
            } 
           
        }
        else{
            res.status(400).json({"message":"Record not found"})
        }
    } catch (error) {
        if(error.name==="CastError"){
            res.status(400).json({"message":"Invalid id"})
        }
        else{
            res.status(500).json(error)
        }
    }
}
const updatetask=async (req,res)=>{
    const {id}=req.params
    const userid=req.user.id
    try {
        const task=await TaskModel.findOne({"_id":id})
        if(task.userid.toString()!=userid){
          return  res.status(400).json({"message":"You Dont have Access to this Task"})
        }
        const updatedtask=await TaskModel.findOneAndUpdate({"_id":id},req.body,{new:true})
        if(updatedtask){ 
          return  res.status(201).json(updatedtask)
        } 
        else{
          return  res.status(404).json({"message":"Record not found"})
        }
    } catch (error) {
        if(error.name==="CastError"){
            res.status(400).json({"message":"Invalid id"}) 
        }
        else{
            res.status(500).json(error)
        }
    }
}
const deletetask=async (req,res)=>{
    const {id}=req.params 
    const userid=req.user.id
    try {
        const task=await TaskModel.findOne({"_id":id})
        if(task.userid!=userid){
          return res.status(400).json({"message":"You Dont have Access to this Task"})
        }
        const deletedtask= await TaskModel.findOneAndDelete({"_id":id})
        if(deletedtask){
           return res.status(201).json({"message":"Record Succesfully Deleted"})
        }
        else{
           return res.status(404).json({"message":"Record not Found"})
        }
    } catch (error) {
        if(error.name==="CastError"){
            res.status(400).json({"messsage":"Invalid id"})
        }
        else{ 
            res.status(500).json(error)
        }
    }
}

module.exports={
    addtask,
    gettask,
    gettaskbyid,
    updatetask,
    deletetask,
}