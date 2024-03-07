const { checkToken } = require('../auth/token_validation')
const loginController=require('../controllers/loginController')

const router=require('express').Router()

router.post('/user',loginController.loginuser)
router.put('/forgetUserPassword',loginController.forgetuserPassword)
router.put('/updateUserPassword',loginController.updateuserPassword)


module.exports=router

