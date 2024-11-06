const SettingGeneral = require('../../models/settings-general.model');
module.exports.settingGeneral = async (req, res, next) => {
    const settingGeneral = await SettingGeneral.findOne({});
    if(settingGeneral) {
        res.locals.settingGeneral= settingGeneral;
    }
    next();
}