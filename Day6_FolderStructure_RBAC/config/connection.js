const mongoose=require('mongoose')

const connectDB=()=>{
    try{
        mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    }
    catch(err){
        console.log("Error while connecting to DB",err);
    }
}

module.exports=connectDB;