const mongoose=require('mongoose')
const User=require('../models/Users')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const login=async(req,res)=>{

    try{
        const {email,password}=req.body;
        
        if(!email || !password) return res.status(401).send({message:"Invalid credentials"});
        
        
        const user =await User.findOne({email});

        if(!user) return res.status(401).send({message:"User not found"});

        
        const match=await bcrypt.compare(password,user.password);
        
        if(!match) return res.status(404).send({message:"Invalid Credentails"})
            

        const token=jwt.sign({id:user._id,email,role:user.role,username:user.username},process.env.TOKEN_SECRET);

        res.cookie("token", token, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                maxAge:2*24*60*60*1000
                });


        // req.email=email;
        // req.role=user.role;

        return res.status(201).send({message:"User is Authenticated",username:user.username,email,role:user.role});
        
    }
    catch(err){
        return res.status(500).send({message:"Something went wrong try again",err});
    }

}

const signup=async (req,res)=>{

    try{

    const {username,email,password}=req.body

    console.log(username,email,password);

    if(!username || !email || !password){
        return res.status(401).send("Fields Missing");
    }

    let user=await User.findOne({email})

    if(user){
       
        return res.status(401).send(`User with ${email} already exists`);
    }

    const hashed=await bcrypt.hash(password,12);

    const user1=await User.create({
        username,
        email,
        password:hashed,
        // role
    });

    user1.save();

    return res.status(200).send({message:"User created Successfully",username:username});

    }
    catch(err){
        return res.status(500).send({message:"Something went wrong",err:err});
    }
}

const sendData=async (req,res)=>{

        const {role,email}=req.user;
    
        if(!role || !email) return res.status(401).send({message:"No user Found"});

        const user=await User.findOne({email});

        if(!user) return res.status(401).send({message:"user with email not found"});

        return res.status(200).send({username:user.username,role,email});
}

module.exports={login,signup,sendData}