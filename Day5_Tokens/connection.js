const mongoose=require('mongoose')


const connect=()=>{

    try{
    mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
}
catch(err){
    console.log('MonogDB Failed To  Connect',err);
}

}

module.exports=connect;

