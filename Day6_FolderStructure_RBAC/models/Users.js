const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    role:{type:String,default:"user"}
});

const User=mongoose.model("Users",UserSchema);

module.exports=User;