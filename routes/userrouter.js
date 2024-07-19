const express=require("express")

const {
    adduser,
    loginuser
}=require("../controllers/usercontroller")

const userrouter=express.Router()

userrouter.post("/signup",adduser)
userrouter.post("/signin",loginuser)

module.exports=userrouter 