const dotenv=require('dotenv')
dotenv.config()
const connectDB=require('./connection')
const express=require('express')
const {signup,login,auth} =require('./authenticate')
const app=express()
const router=express.Router();




app.use(express.urlencoded({extended: true}));
app.use(express.json())

connectDB(); // connecting to DB

router.post('/signup',signup)
router.post('/login',login)
router.use((err, req, res, next) => {
    console.log("Auth Error",err);
    res.status(400).send("Authentication failed");
});


app.use('/test',router);


app.listen(process.env.PORT||5000,()=>{
    console.log(`Server running at ${process.env.PORT}`)
})


