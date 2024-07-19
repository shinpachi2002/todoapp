const mongoose=require("mongoose")

async function dbconnect(){
    const DB_URL=process.env.DB_URL
    const DB=process.env.DB_NAME
    try {
        await mongoose.connect(DB_URL+"/"+DB)
        console.log("Database Sucessfully Connected")
    } catch (error) {
        console.log("Database error:"+error)
    }
}
 
module.exports=dbconnect