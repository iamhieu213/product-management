const Product = require('../../models/product.model')
const ProductCategory = require('../../models/product-category.model');
module.exports.category = async (req, res) => {
    const category = await ProductCategory.find({slug: req.params.slugCategory});
    const products = await Product.find({
        status: "active",
        delete: false,
        categoryID: category.id
    }).sort({position: "desc"});
    
    products.forEach(item => {
        item.newPrice = (item.price*(100 - item.discountPercentage)/100).toFixed(1);
    })
    
    res.render('client/pages/products/index', {
        pageTitle: category.title,
        products: products
    });
}