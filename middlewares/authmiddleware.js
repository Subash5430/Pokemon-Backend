const jwt=require('jsonwebtoken')

const auth=async(req,res,next)=>{
    try{
        const token=await req.header("Authorization")
        if(!token){
            return res.status(400).json({
                message:"Login before move forward"
            })
        }
        const permission=jwt.verify(token,"3e08106dc4dda84a49dacc02c367a9a14154b4afa3ceaa1c0176f3962822d1cce2bc8f4c6953f1a11e8719cc31d5498259d845a10e30e8de984bd9ed958cf1f3")
        req.user=permission.id
        next()
    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}

module.exports=auth