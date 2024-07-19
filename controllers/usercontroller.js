const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const UserModel=require('../models/usermodel')

const adduser=async (req,res)=>{
    try {
       let {name,email,password}=req.body
       let user=await UserModel.findOne({email}) 

       if(user){
        return res.status(400).json({"message":"Email Already exists"})
       }
       const salt=bcrypt.genSaltSync(10)
       password=bcrypt.hashSync(password,salt)

       user=await UserModel.create({name,email,password})
       res.status(201).json(user)
    } catch (error) {
       res.status(500).json(error)
    }   
}

const loginuser=async (req,res)=>{
    try {
        let {email,password}=req.body
        let user=await UserModel.findOne({email})

        if(!user){
           return res.status(404).json({"message":"User not found"})
        }else{
           let confirmpassword=await bcrypt.compare(password,user.password)
           if(!confirmpassword){
            return res.status(404).json({"message":"Invalid Passsword"})
           }
           let token=jwt.sign({user:{id:user._id,name:user.name}},process.env.JWT_SECRET)
           res.status(201).json({"message":"Login Sucessfull",token})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports={
    adduser,
    loginuser
}