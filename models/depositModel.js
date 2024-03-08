const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        allowNull: true,
    },
    amount: {
        type: Number,
        allowNull: false,
    },
    depositMethod: {
        type: String,
        allowNull: true,
    },
    currency: {
        type: String,
        allowNull: true,
    },
    channel: {
        type: String,
        allowNull: true,
    },
    image: {
        type: String,
        allowNull: true,
    },
    verify: {
        type: Boolean,
        allowNull: true,
    },
    createdAt:{ 
        type: Date, 
        default: Date.now() 
    },
});


const Deposit = mongoose.model('Deposit', depositSchema);

module.exports = Deposit;
