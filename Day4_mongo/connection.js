const mongo=require('mongoose')

const connectDB=async ()=>{
    try{
        await mongo.connect(process.env.MONGO_URI);
        console.log("MonogDB connection Complete");
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }

}

module.exports= connectDB;

