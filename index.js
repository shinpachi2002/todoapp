const express=require('express')
require('dotenv').config()
const dbconnect=require("./db/dbconfig.js")
const taskRouter=require("./routes/taskrouter.js")
const userrouter = require('./routes/userrouter.js')
const app=express()

app.use(express.json())


app.use("/task",taskRouter)
app.get("/",(req,res)=>{
    res.send("<h1>REST API</h1>")
})
app.use("/",userrouter)
dbconnect() 
app.listen(6000,()=>{
    console.log("server started at localhost 6000")
})    