const Product = require('../../models/product.model');
const ProductCategory = require('../../models/product-category.model');
const productCategoryHelper = require('../../helpers/getListCategory');
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        delete: false
    }).sort({position: "desc"});
    
    products.forEach(item => {
        item.newPrice = (item.price*(100 - item.discountPercentage)/100).toFixed(1);
    })
    
    res.render('client/pages/products/index', {
        pageTitle: "Trang sản phẩm",
        products: products
    });
}

module.exports.detail = async (req, res) => {
    const item = await Product.findOne({slug: req.params.slug});
    if(item) {
        res.render('client/pages/products/detail.pug', {
            title: item.title,
            item: item
        })
    }
    else {
        console.log('Không lấy được sản phẩm do chưa cập nhật slug');
        res.redirect('back');
    }
}

module.exports.category = async (req, res) => {
    
    const category = await ProductCategory.findOne({slug: req.params.categorySlug});
    const listCategory = await productCategoryHelper.getCategoryList(category);
    const listId = listCategory.map(item => item.id)
    const products = await Product.find({
        status: "active",
        delete: false,
        categoryID: {$in: [...listId, category.id]}
    }).sort({position: "desc"});
    
    products.forEach(item => {
        item.newPrice = (item.price*(100 - item.discountPercentage)/100).toFixed(1);
    })
    
    res.render('client/pages/products/index', {
        pageTitle: category.title,
        products: products
    });
}