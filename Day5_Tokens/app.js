const jwt=require('jsonwebtoken')
const express=require('express')
const cookie_parser=require('cookie-parser')
const bcrypt=require('bcrypt')
require('dotenv').config();
const connect=require('./connection');
const {User,Token}=require('./user');

const app=express()
app.use(express.urlencoded({extended: true}));
app.use(cookie_parser());
app.use(express.json());

connect(); // connecting to mongoDB Atlas

app.post('/auth/signup',async(req,res,next)=>{

    try{

        const {username,password,email}=req.body;
        console.log(username,password,email)
        const user1=await User.findOne({username:username});
        
        if(user1) return res.status(401).send("user Exists");

        const hashPassword=await bcrypt.hash(password,10);
   
        const user=await User.create({
            username:username, 
            password:hashPassword,
            email:email  
        });

        user.save();

        return res.status(200).send("User Created");

    }
    catch(err){
        return res.status(500);
    }

})

app.post('/auth/login',async (req,res,next)=>{

    try{
    const {username,password}=req.body;

    const user=await User.findOne({username:username});

    if(!user){
        console.log("user not found");
        return res.status(404).send("invalid Credentials");
    }


    const match=await bcrypt.compare(password,user.password);

    if(!match) return res.status(401).send("invalid credentials");

    const RefreshToken=jwt.sign({name:username},process.env.REFRESH_SECRET,{expiresIn:"7d"});
    const acessToken=jwt.sign({name:username},process.env.ACCESS_SECRET,{expiresIn:"10m"});

    res.cookie('token',RefreshToken,{
        httpOnly:true,
        sameSite:"none",
        secure:true
    });

    res.cookie('acessToken',acessToken,{
        httpOnly:true,
        secure:true,
        sameSite:"none",
    })

    const token=await Token.create({
        username:username,
        refreshToken:RefreshToken,
        expiresAt:Date.now(),
    });

    req.refreshToken=RefreshToken;

    return res.status(200).send({status:"Authentication Successful",acessToken:acessToken});

    }
    catch(err){
        return res.status(500).send(err);
    }

})


app.get("/auth",async (req,res,next)=>{

    const refreshtoken=req.cookies.token;
    const acessToken=req.cookies.accessToken
    console.log(refreshtoken,acessToken)
    try{
        
    if(!acessToken){

        if(!refreshtoken) return res.status(404).send("Token not found");

        const data=jwt.verify(refreshtoken,process.env.REFRESH_SECRET);

        if(data){
            const username=data.username;

            const user=await Token.findOne({username:username});

            if(!user) return res.status(404).send("token not found");

            if((Date.now()-user.expiresAt)>7){
                return res.status(401).send("Token not found"); 
            }

            const acesstoken=jwt.sign({name:username},process.env.ACCESS_SECRET,{expiresIn:"10m"});
            
            res.cookie("acessToken",acesstoken,{
                httpOnly:true,
                secure:true,
                sameSite:"none"
            });

            return res.status(200).send({acessToken:acesstoken});
        }
        return res.status(404).send("Token Not found")
    }
    else{

        try{
            const data=jwt.verify(acessToken,process.env.ACCESS_SECRET);
            return res.status(200).send("Succussfully acessed");
        }
        catch(err){

            if(!refreshtoken) return res.status(404).send("Token not found");

            const data=jwt.verify(refreshtoken,process.env.REFRESH_SECRET);

            if(data){
            const username=data.username;

            const user=await Token.findOne({username:username});

            if(!user) return res.status(404).send("user not found");

            if(Date.now()-user.expiresAt>7){
                return res.status(401).send("Token not found"); 
            }

            const acesstoken=jwt.sign({name:username},process.env.ACCESS_SECRET,{expiresIn:"10m"});
            
            res.cookie("acessToken",acesstoken,{
                httpOnly:true,
                secure:true,
                sameSite:"none"
            });

            return res.status(200).send({acessToken:acesstoken});
        }
        return res.status(404).send("Token Not found")

        }

    }



    }

    catch(err){
        return res.status(404).send("token Not found")
    }

    

    

})


app.listen(5000,()=>{
    console.log("server running at 5000 port");
})