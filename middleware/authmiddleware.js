const jwt=require('jsonwebtoken')

const authenticateuser=(req,res,next)=>{
      const token=req.header('Authorization')

      if(!token){
        res.status(401).json({"message":"Unathorized User"})
      }

      let jwttoken=token?.split(" ")[1]

      try {
       let decodeddata=jwt.verify(jwttoken,process.env.JWT_SECRET)
       req.user=decodeddata.user
       next()
      } catch (error) {
         res.status(400).json({"message":"Invalid Token"})
      } 
} 

module.exports=authenticateuser