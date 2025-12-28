const express=require('express');
const auth=require('../middlewares/authMiddleware')
const router=express.Router();

const {login,signup, sendData}=require('../controllers/authControllers')

router.post("/login",login)
router.post("/signup",signup)
router.get("/isLogin",auth,sendData)

module.exports=router