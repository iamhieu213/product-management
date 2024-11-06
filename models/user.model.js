const mongoose = require('mongoose');
const generateHelper = require('../helpers/generate')
const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    tokenUser: {
        type: String,
        default: generateHelper.generateRandomString(30)
    },
    phone: Number,
    status: {
        type: String,
        default: 'active'
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema, "users");

module.exports = User;