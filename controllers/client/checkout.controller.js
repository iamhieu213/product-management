const Cart  = require('../../models/Carts.model');
const Product = require('../../models/product.model');
const Order = require('../../models/order.model');
const productHelper = require('../../helpers/products');

module.exports.index = async (req, res) => {
    const cart = await Cart.findOne({_id: req.cookies.cartId});

    let totalPerOrder = 0;
    for (const item of cart.products) {
        const product = await Product.findOne({_id: item.product_id});
        product.priceNew = productHelper.getPriceNew(product);
        item.totalPay = item.quantity*product.priceNew;
        totalPerOrder += item.totalPay;
        item.product = product;
    }
    
    res.render('client/pages/checkouts/index', {
        pageTitle: 'Trang thanh toán',
        cart: cart,
        totalPerOrder: totalPerOrder
    })
}

module.exports.order = async (req, res) => {
    const cartId = req.cookies.cartId;
    const userInfo = req.body;
    const cart = await Cart.findOne({_id: cartId});

    let products = [];

    for (const item of cart.products) {
        const product = await Product.findOne({_id: item.product_id});
        const objProduct = {
            product_id: item.product_id,
            quantity: item.quantity,
            price: product.price,
            discountPercentage: product.discountPercentage
        }
        products.push(objProduct)
    }

    const newOrder = {
        cart_id: cartId,
        userInfo: userInfo,
        products: products
    }
    
    const order = new Order(newOrder);
    await order.save();

    await Cart.updateOne({_id: cartId}, {products: []});
    res.redirect(`/checkout/success/${order.id}`);
}