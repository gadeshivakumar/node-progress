const express=require('express')
require('dotenv').config()
const cookieParser = require('cookie-parser');
const cors=require('cors')
const connectDB=require('./config/connectDB')

// routes
const authRoutes=require('./routes/authRoutes');
const userRoutes=require('./routes/userRoutes')

const app=express();

const origin=process.env.ORIGIN || "http://localhost:5173"

const corsOptions = {
  origin: origin,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
// app.options("/*", cors(corsOptions));

app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

connectDB()

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);

const port=process.env.PORT || 8080
app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
})