const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    invitationCode: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        allowNull: true,
    },
    userName: {
        type: String,
        allowNull: false,
    },
    email: {
        type: String,
        allowNull: true,
    },
    dob: {
        type: String,
        allowNull: true,
    },
    wallet: {
        type: Number,
        allowNull: true,
    },
    gender: {
        type: String,
        allowNull: true,
    },
    image: {
        type: String,
        allowNull: true,
    },
    phone: {
        type: String,
        allowNull: false,
    },
    loginPassword: {
        type: String,
        allowNull: false,
    },
    withdrawPassword: {
        type: String,
        allowNull: false,
    },
    realName: {
        type: String,
        allowNull: false,
    },
    deposit: {
        type: Boolean,
        allowNull: true,
    },
    block: {
        type: Boolean,
        allowNull: true,
    },
    createdAt:{ 
        type: Date, 
        default: Date.now() 
    },
});


const User = mongoose.model('User', userSchema);

module.exports = User;
