const Product = require('../../models/product.model');
const ProductCategory = require('../../models/product-category.model');
const Account = require('../../models/account.model');
const User = require('../../models/user.model');

module.exports.dashboard = async (req, res) => {
    
    const products = {};
    products.qtt = await Product.countDocuments({});
    products.active = await Product.countDocuments({status: "active"});
    products.inactive = await Product.countDocuments({status: "inactive"});

    const productsCategory = {};
    productsCategory.qtt = await ProductCategory.countDocuments({});
    productsCategory.active = await ProductCategory.countDocuments({status: "active"});
    productsCategory.inactive = await ProductCategory.countDocuments({status: "inactive"});

    const accounts = {};
    accounts.qtt = await Account.countDocuments({});
    accounts.active = await Account.countDocuments({status: "active"});
    accounts.inactive = await Account.countDocuments({status: "inactive"});

    const users = {};
    users.qtt = await User.countDocuments({});
    users.active = await User.countDocuments({status: "active"});
    users.inactive = await User.countDocuments({status: "inactive"});


    
    res.render("admin/pages/dashboard/dashboard.pug", {
        title: "Trang tổng quan",
        products: products,
        productsCategory: productsCategory,
        users: users,
        accounts: accounts
    })
}
