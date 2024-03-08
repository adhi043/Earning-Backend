const ReferralEarning = require('../models/referralEarningModel');
const { mainUrl } = require('../config/dbConfig');


// 1. Create referralEarning
const addreferralEarning = async (req, res) => {
    try {
        const info = {
            userId: req.body.userId,
            ownBonus: req.body.ownBonus,
            directEarnA: req.body.directEarnA,
            inDirectB: req.body.inDirectB,
            inDirectC: req.body.inDirectC,
            inDirectD: req.body.inDirectD,
            inDirectE: req.body.inDirectE,
        };

        // const checkreferralEarningname = await ReferralEarning.findOne({ referralEarningName: info.referralEarningName });

        const referralEarning = await ReferralEarning.create(info);
        return res.status(200).json({ status: 'ok', data: referralEarning });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Get all referralEarnings
const getreferralEarnings = async (req, res) => {
    try {
        const referralEarnings = await ReferralEarning.find({});
        return res.status(200).json({ status: 'ok', data: referralEarnings });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. Get referralEarning by id
const getreferralEarningById = async (req, res) => {
    try {
        const id = req.params.id;
        const referralEarning = await ReferralEarning.findById(id);
        return res.status(200).json({ status: 'ok', data: referralEarning });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 4. Update referralEarning
const updatereferralEarning = async (req, res) => {
    try {
        let id = req.params.id;
        // let getImage = await ReferralEarning.findById(id);
        // const image = req.files.image === undefined ? getImage.image : mainUrl + req.files.image[0].filename;


        const updatedreferralEarning = await ReferralEarning.findByIdAndUpdate(id,
            { ...req.body,  },
            { new: true });
        return res.status(200).json({ status: 'ok', data: updatedreferralEarning });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 5. Delete referralEarning
const deletereferralEarning = async (req, res) => {
    try {
        const id = req.params.id;
        await ReferralEarning.findByIdAndDelete(id);
        return res.status(200).json({ status: 'ok', message: 'ReferralEarning deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    addreferralEarning,
    getreferralEarnings,
    getreferralEarningById,
    updatereferralEarning,
    deletereferralEarning
};
