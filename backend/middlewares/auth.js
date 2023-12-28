const { verifyToken } = require("../utils/jwt");

const authMiddleware=(req,res,next)=>{
const token=req.headers.token;
const data =verifyToken(token)

if(data){
    req.params.id=data.data;

    next()
    return
}

res.status(401).json({
    success:false,
    error:"Token Not Valid"
})

}


module.exports={
    authMiddleware
}