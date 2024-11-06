module.exports.createPost = (req, res, next) => {
    if(!req.body.title) {
        req.flash('error', "Bắt buộc phải nhập tiêu đề cho sản phẩm");
        res.redirect("back");
        return;
    }
    next();
}



module.exports.changeStatusMulti = (req, res, next) => {
    if(!req.body.ids) {
        req.flash('error', 'Yêu cầu chọn ít nhất 1 bản ghi');
        res.redirect('back');
        return
    }
    next();
}
