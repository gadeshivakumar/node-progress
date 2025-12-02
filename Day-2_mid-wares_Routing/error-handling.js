const app=require('express')()

// for any error handling middleware it should have four arguments
// (err,req,res,next)

app.use((req,res,next)=>{
    console.log('an error thrower');
    next('new error');
})

app.use('/users/:id',(err,req,res,next)=>{
    if(err){
        console.log(err);
        return res.send('caught the error');
    }
    res.send('clean execution')
})

app.listen(5000);