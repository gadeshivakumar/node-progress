const jwt=require('jsonwebtoken')

const auth=(req,res,next)=>{
    
    try{
    const token=req.cookies.token;
    
    if(!token) return next("Token not found");

    const data=jwt.verify(token,process.env.TOKEN_SECRET);

    req.user={email:data.email,username:data.username,role:data.role}

    next()

    }
    catch(err){
        return next("Invalid token");
    }

}
module.exports=auth