const mongoose=require('mongoose')

const taskSchema=new mongoose.Schema(
    {
    title:String,
    description:String,
    status:String,
    createdBy:String
    },
    {
        timestamps:true
    }
)

const Task=mongoose.model("Tasks",taskSchema);

module.exports=Task