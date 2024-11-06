const Account = require('../../models/account.model');
const md5 = require('md5')
module.exports.login = (req, res) => {
    const token = req.cookies.token;
    if(token) {
        res.redirect('/admin/dashboard');
        return
    }
    res.render('admin/pages/auth/login');
}

module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = md5(req.body.password);
    const checkUser = await Account.findOne({email: email, deleted: false});
    
    if(!checkUser) {
        req.flash('error', 'Tài khoản không tồn tại');
        res.redirect('back');
        return;
    }

    if(password!=checkUser.password) {
        req.flash('error', 'Sai mật khẩu');
        res.redirect('back');
        return;
    }

    res.cookie('token', checkUser.token);
    res.redirect('/admin/dashboard');

    //Thêm người dùng vào phiên hiện tại

}

module.exports.logout = (req, res) => {
    res.clearCookie('token');
    res.redirect(`/admin/auth/login`);
}