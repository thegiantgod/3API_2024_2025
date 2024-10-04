const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    RIB: {
        type: String,
        unique: true
    },
    type: {
        type: String,
        enum: ['Professional', 'Saving', 'Personnal'],
        default: 'Personnal'
    },
    balance: {
        type: Number,
    },
    ownerId: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true,
      },
});

module.exports = mongoose.model('account', accountSchema);