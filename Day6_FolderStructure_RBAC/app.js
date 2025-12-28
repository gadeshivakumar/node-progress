const express=require('express')
require('dotenv').config()
const authRouter=require('./routers/authRouters');
const app=express();
const connectDB=require('./config/connection');

connectDB();

app.use('/api/users',authRouter);

app.listen(5000,()=>{
    console.log("Server started......")
})