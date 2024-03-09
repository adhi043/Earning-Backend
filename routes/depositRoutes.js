const { checkToken } = require('../auth/token_validation')
const depositController=require('../controllers/depositController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',depositController.getdeposits)
router.post('/create',upload.fields([{name:'image',maxCount:1}]),depositController.adddeposit)

router.get('/get/:id',depositController.getdepositById)
router.put('/verify/:id',depositController.updateApprovedeposit)
router.put('/update/:id',upload.fields([{name:'image',maxCount:1}]),depositController.updatedeposit)
router.delete('/delete/:id',depositController.deletedeposit)


module.exports=router

