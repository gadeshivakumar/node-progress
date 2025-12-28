const jwt=require('jsonwebtoken')

const auth=(req,res,next)=>{
    try{

        const token=req.cookies.token;

        if(!token){
            console.log("no token found")
            return next("user does not have token")
        }

        const {email,id,role}=jwt.verify(token,process.env.TOKEN_SECRET)

        req.user={email,role}

        next();

    }catch(err){
        next("user is not authenticated");
    }
}

module.exports=auth;