const express=require('express')

const router=express.Router();
const adminAuth=require('../middlewares/adminAuth');
const adminControl=require('../controllers/adminControl');
const userControl=require('../controllers/userControl');

router.get('/user',(req,res,next)=>{req.username="normal_user"; next();},userControl);
router.get('/admin',(req,res,next)=>{req.username="normal_user"; next();},adminAuth,adminControl);
router.use('/admin',()=>{
    console.log("Acess Denied");
})

module.exports=router;
