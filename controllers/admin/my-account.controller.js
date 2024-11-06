const Account = require('../../models/account.model');
const md5 = require('md5')
module.exports.index = (req, res) => {
    res.render('admin/pages/my-account/index');
}

module.exports.edit = (req, res) => {
    res.render('admin/pages/my-account/edit');
}


module.exports.editPatch = async (req, res) => {
    try {
        const emailCheck = await Account.findOne({
            email: req.body.email,
            _id: {$ne: res.locals.user.id}
        });

        if(emailCheck) {
            req.flash('error', `Email ${req.body.email} đã tồn tại`);
            res.redirect('back');
            return
        }
        if(req.body.password) {
            req.body.password = md5(req.body.password)
        }
        else {
            delete req.body.password
        }
        await Account.updateOne({_id: res.locals.user.id} , req.body);
        req.flash('success', "Cập nhật thông tin cá nhân thành công");
        res.redirect('back');
        
    } catch (error) {
        req.flash('error', "Cập nhật thông tin cá nhân thất bại");
        res.redirect('back')
    }
}