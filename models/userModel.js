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
