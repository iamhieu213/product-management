const Product = require('../../models/product.model');

module.exports.search = async (req, res) => {
    if(!req.query.keyword) {
        res.redirect('/');
        return
    }

    const products = await Product.find({title: new RegExp(req.query.keyword , 'i'), delete: false, status: 'active'});
    res.render('client/pages/products/index', {
        pageTitle: `Kết quả tìm kiếm cho "${req.query.keyword}"`,
        products: products,
        keyword: req.query.keyword
    });
}