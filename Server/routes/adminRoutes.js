const express=require("express")
const router=express.Router()
const {authAdmin}=require('../controller/adminController')
const {getAllUsers ,deleteUser ,getuser ,updateUser}=require('../controller/userControllers')

router.route("/").get(getAllUsers)
router.route("/adminlogin").post(authAdmin)
router.route("/deleteuser").delete(deleteUser)
router.route("/edituser/:userId").get(getuser)
router.route("/edituser/:userId").patch(updateUser)             





module.exports=router;