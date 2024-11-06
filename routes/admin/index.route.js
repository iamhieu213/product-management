const routeDashboard = require('./dashboard.route');
const routeProducts = require('./products.route');
const routeProductsCategory = require('./products-category.route')
const routeRoles = require('./roles.route');
const routeAcounts = require('./accounts.route');
const routeAuth = require('./auth.route');
const reqAuth = require('../../middlewares/admin/requireAuth.middleware');
const routeMyAcc = require('../../routes/admin/my-account.route');
const routeSetting = require('../../routes/admin/setting.route');
const systemConfig = require('../../config/system');
module.exports = (app) => {
    app.use(`${systemConfig.prefixAdmin}/dashboard`, reqAuth.check, routeDashboard);
    app.use(`${systemConfig.prefixAdmin}/products`, reqAuth.check, routeProducts);
    app.use(`${systemConfig.prefixAdmin}/products-category`, reqAuth.check, routeProductsCategory);
    app.use(`${systemConfig.prefixAdmin}/roles`, reqAuth.check, routeRoles);
    app.use(`${systemConfig.prefixAdmin}/accounts`, reqAuth.check, routeAcounts);
    app.use(`${systemConfig.prefixAdmin}/auth`,reqAuth.checkOut, routeAuth);
    app.use(`${systemConfig.prefixAdmin}/my-account`,reqAuth.check, routeMyAcc);
    app.use(`${systemConfig.prefixAdmin}/setting`,reqAuth.check, routeSetting);
}