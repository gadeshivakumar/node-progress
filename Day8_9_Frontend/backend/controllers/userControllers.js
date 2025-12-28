const User = require("../models/Users");

const userControl=(req,res)=>{
    return res.status(200).send({message:"Welcome to Users Dashboard"});
}

const managerControl=(req,res)=>{
    return res.status(200).send({message:"Welcome to Manager Dashboard"});
}

const adminControl=(req,res)=>{ 
    return res.status(200).send({message:"Welcome to Admin Dashboard"});
}

const makeAdmin=async (req,res)=>{
    try{
        const email=req.params.email;
        const user=await User.findOne({email:email})

        if(!user) return res.status(401).send({message:"user not found"});

        const user1=await User.updateOne({email},{role:"admin"})
        
        return res.status(200).send({message:`${user.username} is admin now`});
        
    }catch(err){
        return res.status(500).send("something went wrong");
    }
}

module.exports={userControl,managerControl,adminControl,makeAdmin}