const mongo=require('mongoose')

const userSchema=new mongo.Schema({
    username:String,
    password:String,
    email:String
});

const User=mongo.model("Users",userSchema);

module.exports=User;

