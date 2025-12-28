const express=require('express')
const auth=require('../middlewares/authMiddleware')
const roleMiddleware=require('../middlewares/roleMiddleware')
const {createTask,viewTasks,deleteTask,getUsers,makeAdmin}=require('../controllers/userControllers')
const router=express.Router();
const cors=require('cors')
router.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
}));

router.post("/create-task",auth,roleMiddleware(["user","admin","manager"]),createTask);
router.get("/:user/view-tasks",auth,roleMiddleware(["user","admin","manager"]),viewTasks);
router.delete("/:user/delete-task/:id",auth,roleMiddleware(["user","admin","manager"]),deleteTask);
router.get('/get-users',auth,roleMiddleware(["manager","admin"]),getUsers)
router.patch('/:user/make-admin',auth,roleMiddleware(['admin']),makeAdmin)
module.exports=router