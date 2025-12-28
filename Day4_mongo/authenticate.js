const User=require('./schema')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const signup=async (req,res,next)=>{

    try{

    const {username,password,email}=req.body;

    if(!username || !password || !email){
        return res.send("Some fields are empty");
    }

    
    const user=await User.findOne({email:email});
    
    if(user) return res.send("User already exists");
    
    const hashed=await bcrypt.hash(password,10);

    const status= await User.create({username:username,password:hashed,email:email});
    console.log("user created")
    return res.send({message:"User created",email:email,username:username});

    }

    catch(err){
        next(err);
    }
}

const login=async(req,res,next)=>{

    try{

        const {email,password}=req.body;

        if(!email || !password) return res.send("Invalid Credentails");

        const user=await User.findOne({email:email});

        if(!user) return res.send("Invalid credentails");

        const match=await bcrypt.compare(password,user.password);

        if(!match) return res.send("Invalid credentials");

        const token=jwt.sign({email:email,username:user.username},process.env.SECRETKEY);

        return res.status(200).send({message:"Logged in",token:token});
        
    }
    catch(err){
        next(err);
    }
}


const auth=(req,res,next)=>{

    try{

        const head = req.headers.authorization?.split(" ");
        

        if(!head){
            return res.send("Auth failure");
        }

        console.log(head);
        const token=head[1];

        const payload=jwt.verify(token,process.env.SECRETKEY);
        
        req.user=payload;

        next();

    }
    catch(err){
        next(err);
    }

}


module.exports={signup,login,auth}