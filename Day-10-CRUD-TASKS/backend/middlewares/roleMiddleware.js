
const roleMiddleware=(allowedRoles)=>{
    return (req,res,next)=>{
        try{
        if(allowedRoles.includes(req.user.role)){
            // console.log("came here")
            return next()
        }
        else{
            return next("Access Denied!")
        }

        }catch(err){
            return next("Access Denied!")
        }

    }
}

module.exports=roleMiddleware