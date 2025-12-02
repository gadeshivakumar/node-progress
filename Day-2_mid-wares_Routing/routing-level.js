const express=require('express')
const app=express()
const router=express.Router();

router.use((req,res,next)=>{
    console.log("prints for any request to this route instance")
    next('router');
})

router.use('/users/:id',(req,res,next)=>{
    console.log("prints for any http method to this route instance")
    next();
},(req,res,next)=>{
    console.log("bye");
    next()
})

router.get("/users/:id",(req,res,next)=>{
    console.log("prints for a get request for the path to this instance")
    next();
})

app.use("/application",router) // mounting router instance

app.use('/application/users/:id',(req,res,next)=>{
    console.log("hey surprise");
})

app.listen(5000,()=>{
    console.log("listening to 5000 port")
})

// use next('router') to skip all middlewares of that routing instance

