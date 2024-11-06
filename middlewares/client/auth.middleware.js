const User = require('../../models/user.model');
module.exports.auth = async (req, res, next) => {
    if(!req.cookies.tokenUser) {
        res.redirect('/');
        return;
    }
    const user = await User.find({tokenUser: req.cookies.tokenUser});
    if(!user) {
        res.redirect('/');
        return;
    }
    next();
}