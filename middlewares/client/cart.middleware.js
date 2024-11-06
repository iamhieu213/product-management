const Cart = require('../../models/Carts.model');

module.exports.init = async (req, res, next) => {

    if(!req.cookies.cartId) {
        const cart = new Cart();
        await cart.save();
        const expiresTime = 1000 * 3600 * 24 * 365
        res.cookie('cartId', cart.id, { expires: new Date(Date.now() + expiresTime)});
        console.log('tạo giỏ hàng');
    }
    else {
        const cart = await Cart.findOne({_id: req.cookies.cartId});
        const total_cart = cart.products.reduce((sum, item) => sum + item.quantity, 0);
        res.locals.totalCart = total_cart
    }
    next();
}