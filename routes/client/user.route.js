

const express = require('express');
const router = express.Router();
const controller = require('../../controllers/client/user.controller');
const userValidate = require('../../validates/user.validate');
const authMiddleware = require('../../middlewares/client/auth.middleware');

router.get('/register', controller.register);
router.post('/register',
    userValidate.validateRegister , 
    controller.registerPost
);

router.get('/login', controller.login);

router.post('/login', 
    userValidate.validateLogin,
    controller.loginPost
);

router.get('/logout', controller.logout);
router.get('/password/forgot', controller.forgotPassword);

router.post('/password/forgot',
    userValidate.validateForgotPassword,
    controller.forgotPasswordPost
);

router.get('/password/otp', controller.otp);
router.post('/password/otp', controller.otpPost);

router.get('/password/reset', controller.reset);
router.post('/password/reset', 
    userValidate.validateResetPassword,
    controller.resetPost
);

router.get('/info', 
    authMiddleware.auth,
    controller.info
);
    
// router.get('/info', controller.info);
module.exports = router;

