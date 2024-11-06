const productRoute = require("./product.route");
const homeRoute = require('./home.route');
const getCategoryMiddleware = require('../../middlewares/client/getCategory.middleware');
const cartMiddleware = require('../../middlewares/client/cart.middleware');
const searchRoute = require('./search.route');
const cartRoute = require('./cart.route');
const checkoutRoute = require('./checkout.route');
const userRoute = require('../client/user.route');
const userMiddleware = require('../../middlewares/client/user.middleware');
const settingGeneralMiddleware = require('../../middlewares/client/setting-general.middleware');
const chatRoute = require('../../routes/client/chat.route');
module.exports = (app) => {
    app.use(cartMiddleware.init);
    app.use(userMiddleware.infoUser);
    app.use(settingGeneralMiddleware.settingGeneral);
    app.use(getCategoryMiddleware.makeCategoryTree);
    app.use('/', homeRoute);
    app.use('/products', productRoute);
    app.use('/search', searchRoute);
    app.use('/carts', cartRoute)
    app.use('/checkout', checkoutRoute);
    app.use('/user', userRoute);
    app.use('/chat', chatRoute);
}
