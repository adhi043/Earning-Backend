const User = require('../models/userModel');
const { compareSync, hashSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const dbConfig = require('../config/dbConfig.js');
const noduserNameer = require('noduserNameer');


const loginuser = async (req, res) => {
    try {
        console.log(req.body);
        let info = {
            userName: req.body.userName,
            loginPassword: req.body.loginPassword,
        };

        const userData = await User.findOne({ userName: info.userName });

        if (userData) {
            const isloginPasswordMatch = await User.findOne({ loginPassword: info.loginPassword });
            if (isloginPasswordMatch) {
                // Generate JWT token for authentication
                const token = sign({ id: userData._id, userName: userData.userName }, dbConfig.KEY_NAME, { expiresIn: '1h' });

                res.status(200).json({
                    status: 'ok',
                    message: "Successfully logged in",
                    token: token,
                    data: userData,
                });
            } else {
                res.status(200).json({
                    status: 'fail',
                    message: 'Wrong loginPassword',
                });
            }
        } else {
            res.status(200).json({
                status: 'fail',
                message: 'userName not found',
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

const forgetuserloginPassword = async (req, res) => {
    try {
        let info = {
            userName: req.body.userName,
            phone: req.body.phone,
        };

        const guser = await User.findOne(info);

        if (guser) {
            res.status(200).json({
                status: 'ok',
                data: guser,
            });
        } else {
            res.status(200).json({
                status: 'fail',
                message: 'First Register yourself!',
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

const updateuserloginPassword = async (req, res) => {
    try {
        let info = {
            userName: req.body.userName,
            phone: req.body.phone,
        };

        const guser = await User.findOne(info);

        if (guser) {
            // Hash the new loginPassword before updating
            const newloginPasswordHash = hashSync(req.body.loginPassword, 10);

            await User.updateOne({ userName: info.userName }, { loginPassword: newloginPasswordHash });

            return res.status(200).json({
                status: 'ok',
                message: 'Updated Successfully',
                data: guser
            });
        } else {
            res.status(200).json({
                status: 'fail',
                message: 'First Register yourself!',
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

module.exports = {
    loginuser,
    forgetuserloginPassword,
    updateuserloginPassword,
};
