const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:String,
    password:String,
    email:String,
});

const tokenSchema=new mongoose.Schema({
    username:String,
    resfresToken:String,
    expiresAt:Date,
})

const User=mongoose.model("UsersDetails",userSchema);
const Token=mongoose.model("TokensDetails",tokenSchema);
module.exports={User,Token};