const Cart  = require('../../models/Carts.model');
const Product = require('../../models/product.model');
const { updateOne } = require('../../models/product.model');
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
    
    res.render('client/pages/carts/index', {
        pageTitle: 'Trang giỏ hàng',
        cart: cart,
        totalPerOrder: totalPerOrder
    })
}

module.exports.addToCart = async (req, res) => {
    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({_id: cartId});
    
    const product = cart.products.find(item => item.product_id == productId);
    const objAdd = {
        product_id: productId,
        quantity: quantity
    };
    
    if(product) {
        const newQtt = product.quantity + quantity;
        await Cart.updateOne(
            { _id: cartId, "products.product_id": productId },
            { $set: { "products.$.quantity": newQtt } }
        )
    }
    else {
        await Cart.updateOne({_id: cartId}, {
            $push: {
                products: objAdd
            }
        })
    }
    req.flash('success','Thêm vào giỏ hàng thành công')
    res.redirect('back');
} 


module.exports.updateQtt = async (req, res) => {
    const productId = req.params.productId;
    const quantity = parseInt(req.params.quantity);
    const cartId = req.cookies.cartId;
    const newQtt = quantity
    await Cart.updateOne(
        { _id: cartId, "products.product_id": productId },
        { $set: { "products.$.quantity": newQtt } }
    )
    req.flash('success','Cập nhật số lượng thành công')
    res.redirect('back');
} 



module.exports.delete = async (req, res) => {
    const productId = req.params.productId;
    const cartId = req.cookies.cartId;


    await Cart.updateOne(
        { _id:  cartId},
        { $pull: { products: { product_id: productId }}}
      );

    req.flash('success','Xóa thành công')
    res.redirect('back');
} 