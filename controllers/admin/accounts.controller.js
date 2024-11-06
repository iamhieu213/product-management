const Account = require('../../models/account.model');
const Role = require('../../models/roles.model');
const md5 = require('md5');
module.exports.index = async (req, res) => {

    const accounts  = await Account.find({deleted: false});

    res.render('admin/pages/accounts/index', {
        accounts: accounts
    })
}   

module.exports.create = async (req, res) => {
    const roles = await Role.find({deleted: false})
    res.render('admin/pages/accounts/create', {
        roles: roles
    });
}

module.exports.createPost = async (req, res) => {
    req.body.password = md5(req.body.password);
    const account = new Account(req.body);
    await account.save();
    req.flash('success', 'Tạo mới thành công')
    res.redirect('back');
}

module.exports.edit = async (req, res) => {
    const roles = await Role.find({deleted: false});
    
    
    const account = await Account.findOne({_id: req.params.id, deleted: false});
    res.render('admin/pages/accounts/edit' ,{
        roles: roles,
        account: account
    });
}

module.exports.editPatch = async (req, res) => {
    if(req.body.password) {
        req.body.password = md5(req.body.password);
    }
    const user = await Account.findOne({ _id: { $ne: req.params.id },  email: req.body.email });
    

    if(user) {
        req.flash('error', `Email ${req.body.email} đã tồn tại`);
        res.redirect('back');
        return
    }
    else{
        
        await Account.updateOne({_id: req.params.id}, req.body)
        req.flash('success', 'Cập nhật thành công');
        res.redirect('back');
    }
}