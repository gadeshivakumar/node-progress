const express=require('express')
require('dotenv').config()
const app=express();
const connectDB=require('./config/connectDB')
const authRoutes=require('./routes/authRoutes')
const userRoutes=require('./routes/userRoutes')
const cors=require('cors')
const cookieParser = require("cookie-parser");




app.use(
    cors({
        origin:"http://localhost:5173",
        credentials:true
    })
)
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

connectDB();


app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);




app.listen("5000",()=>{
    console.log("server is running at 5000");
})