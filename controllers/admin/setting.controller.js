const SettingGeneral = require('../../models/settings-general.model');

module.exports.general = async (req, res) => {

    const settingGeneral = await SettingGeneral.findOne({});
    
    res.render('admin/pages/setting/general', {
        settingGeneral: settingGeneral
    });
}

module.exports.generalPatch = async (req, res) => {
    const settingGeneral = await SettingGeneral.findOne({});
    console.log(req.file);
    
    if(settingGeneral) {
        await SettingGeneral.updateOne({_id: settingGeneral.id}, req.body);
        req.flash('success', 'Cập nhật thành công')
        res.redirect('back');
    }
    else {
        const newSettingGeneral = new SettingGeneral(req.body);
        await newSettingGeneral.save();
        console.log(newSettingGeneral);
        
        req.flash('success', 'Cập nhật thành công')
        res.redirect('back');
    }
}