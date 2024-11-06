module.exports.validateRegister = (req, res, next) => {
    console.log('Chạy vào  ni');
    if(!req.body.email) {
        req.flash('error', 'Không được để trống email');
        res.redirect('back');
        return
    }

    if(!req.body.password) {
        req.flash('error', 'Không được để trống mật khẩu');
        res.redirect('back');
        return
    }

    if(!req.body.fullName) {
        req.flash('error', 'Không được để trống họ tên');
        res.redirect('back');
        return
    }
    next();
}


module.exports.validateLogin = (req, res, next) => {
    console.log('Chạy vào  login');
    if(!req.body.email) {
        req.flash('error', 'Không được để trống email');
        res.redirect('back');
        return
    }
    if(!req.body.password) {
        req.flash('error', 'Không được để trống mật khẩu');
        res.redirect('back');
        return
    }
    next();
}

module.exports.validateForgotPassword = (req, res, next) => {
    if(!req.body.email) {
        req.flash('error', 'Không được để trống email');
        res.redirect('back');
        return
    }
    next();
}

module.exports.validateResetPassword = (req, res, next) => {
    if(!req.body.password) {
        req.flash('error', 'Bạn phải nhập mật khẩu mới');
        res.redirect('back');
        return
    }

    if(!req.body.confirmPassword) {
        req.flash('error', 'Xác nhận mật khẩu không được để trống');
        res.redirect('back');
        return
    }

    if(req.body.confirmPassword != req.body.password) {
        req.flash('error', 'Xác nhận mật khẩu không khớp');
        res.redirect('back');
        return
    }
    next();
}