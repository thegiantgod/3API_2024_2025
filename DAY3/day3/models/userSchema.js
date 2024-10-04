const mongoose = require("mongoose");

const PASS_MIN_LENGTH = 7;
const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    INE: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        minlength: [PASS_MIN_LENGTH, `Error, password must be of minimum length : ${PASS_MIN_LENGTH}`]
    }
});

module.exports = mongoose.model('user', userSchema);
