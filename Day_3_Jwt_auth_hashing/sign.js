const users=require('./data')
const bcrypt=require('bcrypt')

const signup=async (req,res,next)=>{
    const {username,email,password}=req.body;
    const user=users.find((u)=>u.email==email);
    if(user){
        return res.send("user already exists");
    }
    const hashed=await bcrypt.hash(password,10);
    users.push({id:Date.now(),username,email,password:hashed});
    return res.send("user created successfully");
}

export default signup;