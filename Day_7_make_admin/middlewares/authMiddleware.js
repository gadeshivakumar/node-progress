const jwt=require('jsonwebtoken')

const auth=(req,res,next)=>{
    try{

        const token=req.cookies.token;

        if(!token) return next("user does not have token")

        const {email,id,role}=jwt.verify(token,process.env.TOKEN_SECRET)

        req.email=email;
        req.role=role;

        next();

    }catch(err){
        next("user is not authenticated");
    }
}

module.exports=auth;