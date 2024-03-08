const { checkToken } = require('../auth/token_validation')
const referralEarningController=require('../controllers/referralEarningController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',referralEarningController.getreferralEarnings)
router.post('/create',referralEarningController.addreferralEarning)

router.get('/get/:id',referralEarningController.getreferralEarningById)
router.put('/update/:id',referralEarningController.updatereferralEarning)
router.delete('/delete/:id',referralEarningController.deletereferralEarning)


module.exports=router

