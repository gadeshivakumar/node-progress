const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    role:{type:String,default:"user"}
})

const User=mongoose.model("Users",userSchema);

module.exports=User