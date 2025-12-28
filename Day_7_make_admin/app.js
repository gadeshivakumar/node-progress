const express=require('express')
require('dotenv').config()
const app=express();
const connectDB=require('./config/connectDB')
const authRoutes=require('./routes/authRoutes')
const userRoutes=require('./routes/userRoutes')



app.use(express.urlencoded(true));
app.use(express.json());

connectDB();


app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);




app.listen("5000",()=>{
    console.log("server is running at 5000");
})