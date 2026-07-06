const jwt=require('jsonwebtoken')

require('dotenv').config()

const auth=async(req,res,next)=>{
    try{
        const token=await req.header("Authorization")
        if(!token){
            return res.status(400).json({
                message:"Login before move forward"
            })
        }
        const permission=jwt.verify(token,process.env.API_SECRET)
        req.user=permission.id
        next()
    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}

module.exports=auth