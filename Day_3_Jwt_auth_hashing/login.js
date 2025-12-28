const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const login=async(req,res,next)=>{
    const {email,password}=req.body;
    const user=users.find((u)=>u.email==email);
    if(!user){
        return res.send("Invalid credentials");
    }

    const test=await bcrypt.compare(password,user.password)

    if(!test){
        return res.send("invalid credentials");
    }

    const token=jwt.sign({email,username:user.username},process.env.SECRET_KEY);
    
    return res.send(token);
}

export default login;   