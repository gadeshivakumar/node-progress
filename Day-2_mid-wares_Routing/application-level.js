const express=require('express')

const app=express()


// This middle-ware executes everytime it gets a reques, whatsoever request
app.use((req,res,next)=>{
    console.log("Prints everytime for any request")
    //next() - if it is not present then next middle-ware wont be executed 
})

// middleware that executes for any request to specific path
app.use('/users/:id',(req,res,next)=>{
    console.log("request recieved");
})

app.get('/user/:id', (req, res, next) => {
  // if the user ID is 0, skip to the next matching route(i.e /user/:id')
  if (req.params.id === '0') next('route')
  // otherwise pass the control to the next middleware function in this stack
  else next()
}, (req, res, next) => {
  // send a regular response
  // res.send('regular')
  console.log("completed")
  next()
})

// handler for the /user/:id path, which sends a special response
app.get('/user/:id', (req, res, next) => {
  console.log('came here as well')
  res.send('special-thanks')
})




app.listen(5000,()=>{
    console.log("server is running on 5000")
})