const User=require('../models/Users')
const adminAuth=async (req,res,next)=>{

    const username=req.username
    if(!username) next("username not found");
    const user=await User.findOne({username:username});

    if(!user){
        return next("user not found");
    }

    if(user.role=="admin"){
        return next();
    }

    next("Acess Denied");

}

module.exports=adminAuth;