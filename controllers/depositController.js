const Deposit = require('../models/depositModel');
const ReferralEarning = require('../models/referralEarningModel');
const User = require('../models/userModel');
const { mainUrl } = require('../config/dbConfig');


// 1. Create deposit
const adddeposit = async (req, res) => {
    try {
        const info = {
            image: req.files.image === undefined ? '' : mainUrl + req.files.image[0].filename,
            userId: req.body.userId,
            depositMethod: req.body.depositMethod,
            amount: req.body.amount,
            currency: req.body.currency,
            channel: req.body.channel,
            verify: req.body.verify
        };




        const deposit = await Deposit.create(info);
        return res.status(200).json({ status: 'ok', data: deposit });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Get all deposits
const getdeposits = async (req, res) => {
    try {
        const deposits = await Deposit.find({}).populate('userId');
        return res.status(200).json({ status: 'ok', data: deposits });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. Get deposit by id
const getdepositById = async (req, res) => {
    try {
        const id = req.params.id;
        const deposit = await Deposit.findById(id).populate('userId');
        return res.status(200).json({ status: 'ok', data: deposit });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 4. Update deposit
const updatedeposit = async (req, res) => {
    try {
        let id = req.params.id;
        let getImage = await Deposit.findById(id);
        const image = req.files.image === undefined ? getImage.image : mainUrl + req.files.image[0].filename;


        const updateddeposit = await Deposit.findByIdAndUpdate(id,
            { ...req.body, image: image, },
            { new: true });
        return res.status(200).json({ status: 'ok', data: updateddeposit });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};






// 4. Update deposit
const updateApprovedeposit = async (req, res) => {
    try {
        let id = req.params.id;

        let verify = true

        let getDepo = await Deposit.findById(id);






            let userd = await User.findById(getDepo?.userId);

            let walletDep = (getDepo?.amount * 12) / 100

            const updateddepositUser = await User.findByIdAndUpdate(userd?._id,
                { ...req.body, wallet: userd?.wallet+walletDep,deposit:true },
                { new: true });





            if (userd?.invitationCode.length>0) {

                let walletA = (getDepo?.amount * 12) / 100
                let userA = await User.findOne({userName:userd?.invitationCode});

                const updatedUserA = await User.findByIdAndUpdate(userA?._id,
                    { ...req.body, wallet: userA?.wallet+walletA },
                    { new: true });




                if (userA?.invitationCode.length>0) {

                    let walletB = (getDepo?.amount * 6) / 100
                    let userB = await User.findOne({userName:userA?.invitationCode});
    
                    const updatedUserB = await User.findByIdAndUpdate(userB?._id,
                        { ...req.body, wallet: userB?.wallet+walletB },
                        { new: true });
    
    


                    if (userB?.invitationCode) {

                        let walletC = (getDepo?.amount * 3) / 100
                        let userC = await User.findOne({userName:userB?.invitationCode});
        
                        const updatedUserC = await User.findByIdAndUpdate(userB?._id,
                            { ...req.body, wallet: userC?.wallet+walletC },
                            { new: true });
        
        


                        if (userC?.invitationCode) {

                            let walletD = (getDepo?.amount * 1.5) / 100
                            let userD = await User.findOne({userName:userC?.invitationCode});
            
                            const updatedUserD = await User.findByIdAndUpdate(userD?._id,
                                { ...req.body, wallet: userD?.wallet+walletD },
                                { new: true });
            
            
                        }


                    }
                }


            }





            const info = {
                userId: getDepo?.userId,
                ownBonus: (getDepo?.amount * 12) / 100,
                directEarnA: (getDepo?.amount * 12) / 100,
                inDirectB: (getDepo?.amount * 6) / 100,
                inDirectC: (getDepo?.amount * 3) / 100,
                inDirectD: (getDepo?.amount * 1.5) / 100,
            };

            // const checkreferralEarningname = await ReferralEarning.findOne({ referralEarningName: info.referralEarningName });

            const referralEarning = await ReferralEarning.create(info);

        

        const updateddeposit = await Deposit.findByIdAndUpdate(id,
            { ...req.body, verify: true },
            { new: true });
        return res.status(200).json({ status: 'ok', data: updateddeposit });




    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};








// 5. Delete deposit
const deletedeposit = async (req, res) => {
    try {
        const id = req.params.id;
        await Deposit.findByIdAndDelete(id);
        return res.status(200).json({ status: 'ok', message: 'deposit deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    adddeposit,
    getdeposits,
    getdepositById,
    updatedeposit,
    updateApprovedeposit,
    deletedeposit
};
