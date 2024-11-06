const User = require('../../models/user.model');
const md5 = require('md5');
const ForgotPassword = require('../../models/forgot-password.model');
const generateHelper = require('../../helpers/generate');
const sendMailHelper = require('../../helpers/sendMail');
module.exports.register = async (req, res) => {
    res.render('client/pages/user/register');
}

module.exports.registerPost = async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    console.log(user);
    
    if(user) {
        req.flash('error', 'Email đã tồn tại');
        res.redirect('back');
        return
    }

    else {
        req.body.password = md5(req.body.password);
        const newUser = new User(req.body);
        await newUser.save();
        res.cookie('tokenUser', newUser.tokenUser);
        req.flash('success', 'Đăng ký tài khoản thành công');
        res.redirect('/')
    }
}

module.exports.login = async (req, res) => {
    res.render('client/pages/user/login');
}

module.exports.loginPost = async (req, res) => {
    console.log('ok');
    
    const user = await User.findOne({email: req.body.email});
    if(!user) {
        req.flash('error', 'email không tồn tại');
        res.redirect('back');
        return
    }
    console.log(user);
    const password = md5(req.body.password);
    if(user.password != password) {
        req.flash('error', 'Sai mật khẩu');
        res.redirect('back');
        return
    }

    if(user.status == 'inactive') {
        req.flash('error', 'Tài khoản đã bị khóa');
        res.redirect('back');
        return
    }

    res.cookie('tokenUser', user.tokenUser);
    res.redirect('/');
}

module.exports.logout = (req, res) => {
    res.clearCookie('tokenUser');
    res.redirect('/');
}

module.exports.forgotPassword = (req, res) => {
    res.render('client/pages/user/forgot-password' ,{
        pageTitle: "Quên mật khẩu"
    });
}

module.exports.forgotPasswordPost = async (req, res) => {
    
    const user = await User.findOne({email: req.body.email});
    console.log(user);
    
    if(!user) {
        req.flash('error', 'email không tồn tại');
        res.redirect('back');
        return
    }
    
    if(user.status == 'inactive') {
        req.flash('error', 'Tài khoản đã bị khóa');
        res.redirect('back');
        return
    }

    const forgotPasswordObj = {
        email: req.body.email,
        otp: generateHelper.generateRandomNumber(8),
        expireAt: Date.now()
    }

    const subject = 'Email OTP';
    html = `Đây là mã OTP của bạn để lấy lại mật khẩu. Đừng chia sẻ cho bất kì ai: <b>${forgotPasswordObj.otp}</b>`;

    sendMailHelper.sendMail(req.body.email, subject, html);

    const forgotPassword = new ForgotPassword(forgotPasswordObj);
    await forgotPassword.save();

    res.redirect(`/user/password/otp?email=${req.body.email}`)
}


module.exports.otp = async (req, res) => {
    
    res.render('client/pages/user/otp', {
        pageTitle: "OTP",
        email: req.query.email
    });
}


module.exports.otpPost = async (req, res) => {
    
    const email = req.body.email;
    const otp = req.body.otp;
    const result = await ForgotPassword.findOne({email: email});

    if(!result) {
        req.flash('error', 'OTP không hợp lệ');
        res.redirect('back');
        return
    }

    if(result.otp != otp) {
        req.flash('error', 'OTP không chính xác');
        res.redirect('back');
        return
    }

    const user = await User.findOne({email: email}).select('tokenUser');
    console.log(user);
    

    res.cookie('tokenUser', user.tokenUser);
    res.redirect('/user/password/reset');
}


module.exports.reset = async (req, res) => {
    
    res.render('client/pages/user/reset-password', {
        pageTitle: "Reset password",
    });
}

module.exports.resetPost = async (req, res) => {
    try {
        const password = md5(req.body.password);
        const tokenUser = req.cookies.tokenUser;
        await User.updateOne({tokenUser: tokenUser}, {
            password: password
        });
        req.flash('success', 'Đổi mật khẩu thành công')
        res.redirect('/')
    } catch (error) {
        req.flash('error', 'Đổi mật khẩu mới thất bại, hãy thử lại sau');
        res.redirect('back')
    }
}

module.exports.info = async (req, res) => {
    
    res.render('client/pages/user/info', {
        pageTitle: "Thông tin cá nhân",
    });
}




