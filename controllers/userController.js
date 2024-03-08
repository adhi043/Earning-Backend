const User = require('../models/userModel');
const { mainUrl } = require('../config/dbConfig');


// 1. Create user
const adduser = async (req, res) => {
    try {
        const info = {
            image: req.files.image === undefined ? '':mainUrl + req.files.image[0].filename,
            invitationCode: req.body.invitationCode,
            userName: req.body.userName,
            phone: req.body.phone,
            email: req.body.email,
            dob: req.body.dob,
            gender: req.body.gender,
            loginPassword: req.body.loginPassword,
            withdrawPassword: req.body.withdrawPassword,
            realName: req.body.realName,
            block: req.body.block,
        };

        const checkusername = await User.findOne({ userName: info.userName });

        if(checkusername){
            return res.status(500).json({ status: 'fail', message: 'Username already exist!' });
        }
        else{
            const user = await User.create(info);
            return res.status(200).json({ status: 'ok', data: user });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Get all users
const getusers = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({ status: 'ok', data: users });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. Get user by id
const getuserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        return res.status(200).json({ status: 'ok', data: user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 4. Update user
const updateuser = async (req, res) => {
    try {
        let id = req.params.id;
        let getImage = await User.findById(id);
        const image = req.files.image === undefined ? getImage.image : mainUrl + req.files.image[0].filename;


        const updateduser = await User.findByIdAndUpdate(id, 
            { ...req.body, image: image, }, 
            { new: true });
        return res.status(200).json({ status: 'ok', data: updateduser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 5. Delete user
const deleteuser = async (req, res) => {
    try {
        const id = req.params.id;
        await User.findByIdAndDelete(id);
        return res.status(200).json({ status: 'ok', message: 'user deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    adduser,
    getusers,
    getuserById,
    updateuser,
    deleteuser
};
