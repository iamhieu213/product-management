const mongoose = require('mongoose');



const orderSchema = new mongoose.Schema({
    user_id: String,
    cart_id: String,
    userInfo: {
        fullName: String,
        phone: String,
        address: String
    },
    products: [
        {
            product_id: String,
            quantity: Number,
            price: Number,
            discountPercentage: Number
        }
    ]
}, {timestamps: true});

const Order = mongoose.model('Order', orderSchema, "orders");

module.exports = Order;