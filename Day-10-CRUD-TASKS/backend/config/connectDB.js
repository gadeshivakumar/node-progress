const mongoose=require('mongoose')

async function connectDB(){
    try{
        const connect=await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected`);
    }
    catch(err){
        console.log("Something went wrong please try again");
        process.exit(1);
    }

}

module.exports=connectDB