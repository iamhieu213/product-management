const Account = require('../../models/account.model');
const Role = require('../../models/roles.model');

module.exports.check = async (req, res, next) => {
    const token = req.cookies.token;
    if(token) {
        const user = await Account.findOne({token: token}).select('-password');
        if(user) {
            
            
            const roles = await Role.findOne({_id: user.role_id}).select('title role');
            res.locals.user = user;
            res.locals.permissions = roles
            console.log('Chạy vô ni');
            next();
        }
        
        else{
            res.redirect('/admin/auth/login');
            return
        }
    }
    else{
        res.redirect('/admin/auth/login');
        return
    }
}

module.exports.checkOut = (req, res, next) => {
   next();
}