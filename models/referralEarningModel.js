const mongoose = require('mongoose');

const referralEarningSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        allowNull: true,
    },
    ownBonus: {
        type: Number,
        allowNull: true,
    },
    directEarnA: {
        type: Number,
        allowNull: true,
    },
    inDirectB: {
        type: Number,
        allowNull: true,
    },
    inDirectC: {
        type: Number,
        allowNull: true,
    },
    inDirectD: {
        type: Number,
        allowNull: true,
    },
    inDirectE: {
        type: Number,
        allowNull: true,
    },
    createdAt:{ 
        type: Date, 
        default: Date.now() 
    },
});


const ReferralEarning = mongoose.model('ReferralEarning', referralEarningSchema);

module.exports = ReferralEarning;
