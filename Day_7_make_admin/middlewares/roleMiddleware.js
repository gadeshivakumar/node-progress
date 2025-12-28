const roleMiddleware=(...roles)=>{
    return (req,res,next)=>{
        try{
        if(roles.includes(req.role)){
           console.log("Access Allowed");
           return next(); 
        }
        next("Access Denied");
        }
        catch(err){
            next("Access Denied due to error")
        }
    }
}

module.exports=roleMiddleware