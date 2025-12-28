const express=require('express')
const auth=require('../middlewares/authMiddleware')
const roleMiddleware=require('../middlewares/roleMiddleware')
const {userControl,managerControl,adminControl,makeAdmin}=require('../controllers/userControllers')
const cookie_parser=require('cookie-parser')

const router=express.Router();

router.use(cookie_parser());

router.get('/user',auth,roleMiddleware("user","admin","manager"),userControl)
router.get('/manager',auth,roleMiddleware("manager","admin"),managerControl)
router.get('/admin',auth,roleMiddleware("admin"),adminControl)
router.patch('/make-admin/:email',auth,roleMiddleware("admin"),makeAdmin)

module.exports=router