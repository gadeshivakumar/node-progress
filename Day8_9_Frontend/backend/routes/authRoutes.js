const express=require('express')
const cors=require('cors')
const {login,signup,sendData}=require('../controllers/authController')
const auth=require('../middlewares/authMiddleware')
const router=express.Router();


router.post('/login',login)
router.post('/signup',signup)
router.get('/isLogin',auth,sendData)

module.exports=router
