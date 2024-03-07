const { checkToken } = require('../auth/token_validation')
const userController=require('../controllers/userController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',userController.getusers)
router.post('/create',userController.adduser)

router.get('/get/:id',userController.getuserById)
router.put('/update/:id',userController.updateuser)
router.delete('/delete/:id',userController.deleteuser)


module.exports=router

