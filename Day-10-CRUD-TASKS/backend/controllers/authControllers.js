const User=require('../models/Users')
const jwt =require('jsonwebtoken')
const bcrypt=require('bcrypt')

const login=async (req,res)=>{

        try{

        const {email,password}=req.body;

        if(!email || !password) return res.status(401).send({
                                                                message:"Please Enter Valid Details"
                                                            })

        const user=await User.findOne({email});

        if(!user) return res.status(401).send({
            message:"Invalid Credentials"
        })

        const match= await bcrypt.compare(password,user.password);

        if(!match) return res.status(401).send({
            message:"Invalid Credentails"
        })

        const token=jwt.sign({username:user.username,email:user.email,role:user.role},
                                process.env.TOKEN_SECRET,
                               { expiresIn:"2d"}
                            )

        res.cookie("token",token,{
            httpOnly:true,
            sameSite:"none",
            secure:true,
            maxAge: 2*24*60*60*1000
        })


        return res.status(200).send({
            message:"sucess",
            username:user.username,
            email:user.email,
            role:user.role
        })
    }
    catch(err){
        return res.status(500).send({
            message:"something went wrong"
        })
    }
            
}

const signup=async (req,res)=>{

    try{

    const {username,email,password}=req.body;

    if(!username || !email || !password) return res.status(401).send({
        message:"Missing required fields"
    })

    const user =await User.findOne({email});

    if(user) return res.status(401).send({message:"User exists"});

    const hashed=await bcrypt.hash(password,10);

    const user1= await User.create({
        username,
        email,
        password:hashed
    });

    user1.save();

    return res.status(200).send({
        message:`user created with username ${username}`
    })

    }
    catch(err){
        return res.status(500).send({
            message:"something went wrong , !!! please try again"
        })
    }

}

const sendData=async (req,res)=>{

    try{

    const {username,email}=req.user;

    const user=await User.findOne({email});

    if(!user) return res.status(404).send({
        message:"user not found"
    })

    console.log("hello success")

    return res.status(200).send({
        message:"success",
        username:user.username,
        role:user.role,
        email:user.email
    })

    }
    catch(err){
        return res.status(500).send({
            message:"something went wrong , try again after sometime"
        })
    }


}

module.exports={login,signup,sendData}