
const mongoose = require('mongoose');

const settingGeneralSchema = new mongoose.Schema({
    logo: String,
    email: String,
    phone: String,
    footer: String
}, {timestamps: true});

const SettingGeneral = mongoose.model('SettingGeneral', settingGeneralSchema, "settings-general");

module.exports = SettingGeneral;