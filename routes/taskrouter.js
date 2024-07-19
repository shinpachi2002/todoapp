const express=require('express')
const authenticateuser=require("../middleware/authmiddleware")
const {
    addtask,
    gettask,
    gettaskbyid,
    updatetask,
    deletetask
}=require("../controllers/taskcontroller")

const taskRouter=express.Router()

taskRouter.get("/",authenticateuser,gettask)
taskRouter.get("/:id",authenticateuser,gettaskbyid)
taskRouter.post("/",authenticateuser,addtask)
taskRouter.put("/:id",authenticateuser,updatetask)
taskRouter.delete("/:id",authenticateuser,deletetask)

 
module.exports=taskRouter 