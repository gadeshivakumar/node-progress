const Task=require('../models/Task')
const User=require('../models/Users')

const createTask=async (req,res)=>{

    try{
        const {title,desc,status}=req.body;
        // console.log(title);
        const user_email=req.user.email;

        const addedTask=await Task.create({
            title:title,
            description:desc,
            status:status,
            createdBy:user_email 
        })

        addedTask.save();

        return res.status(200).send({
            message:`New task created by ${user_email}` 
        })

    }catch(err){
        return res.status(500).send({
            message:"something went wrong , please try again later"
        })
    }
}

const viewTasks=async (req,res)=>{
    try{
        const {user}=req.params

        const tasks=await Task.find({createdBy:user}); 

        return res.status(200).send({
            message:"success",
            tasks
        })

    }catch(err){
        return res.status(500).send({
            message:"something went wrong, please try again later"
        })
    }
}

const deleteTask=async (req,res)=>{
    try{
        const {id}=req.params;
        // console.log(id,"hellow")
        if(!id) return res.status(500).send({
            message:"please provide correct task"
        })

        const deleted=await Task.findByIdAndDelete({_id:id});

        return res.status(200).send({
            message:"success"
        })
    }catch(err){
        return res.status(500).send({
            message:"someting went wrong ,please try again later"
        })
    }
}

async function getUsers(req,res){
    try{
    
        const users=await User.find({email:{$ne:req.user.email}})

        return res.status(200).send({
            message:"success",
            data:users
        })

    }catch(err){
        return res.status({
            message:"someting went wrong, please try again later"
        })
    }
}

async function makeAdmin(req,res){
    try{
    const {user}=req.params;
    const user1=await User.findOne({email:user})
    if(!user1) return res.status(401).send({"message":"user not found"})
    
    user1=await User.updateOne({email:user},{
        role:"admin"
    })

    user1.save()

    return res.status(200).send({
        message:"success"
    })
    
    
    }catch(err){
        return res.status(500).send({
            message:"someting went wrong, please try again later"
        })
    }
}
module.exports={createTask,viewTasks,deleteTask,getUsers,makeAdmin}