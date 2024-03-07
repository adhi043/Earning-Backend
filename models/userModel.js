const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    invitationCode: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    userName: {
        type: String,
        allowNull: true,
    },
    loginPassword: {
        type: String,
        allowNull: true,
    },
    withdrawPassword: {
        type: String,
        allowNull: true,
    },
    realName: {
        type: String,
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
