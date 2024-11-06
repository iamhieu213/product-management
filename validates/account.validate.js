
module.exports.createPost = (req, res, next) => {
    if(req.body.fullName == '') {
        req.flash('error', 'Không được để trống tên');
        res.redirect('back')
        return;
    }

    if(req.body.email == '') {
        req.flash('error', 'Không được để trống email');
        res.redirect('back')
        return;
    }

    if(req.body.password == '') {
        req.flash('error', 'Không được để trống mật khẩu');
        res.redirect('back')
        return;
    }

    next();
}

module.exports.editPatch = (req, res, next) => {
    if(req.body.fullName == '') {
        req.flash('error', 'Không được để trống tên');
        res.redirect('back')
        return;
    }

    if(req.body.email == '') {
        req.flash('error', 'Không được để trống email');
        res.redirect('back')
        return;
    }

    if(req.body.password =='') {
        delete req.body.password
    }

    next();
}