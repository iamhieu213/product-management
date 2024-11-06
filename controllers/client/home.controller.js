const Product = require('../../models/product.model')

module.exports.index = async (req, res) => {
    const outstandingProducts = await Product.find({isOuStanding: '1', 
        delete: false, 
        status: 'active'
    });
    const newProductsList = await Product.find({
        delete: false, 
        status: 'active',
    }).sort({position: 'desc'}).limit(6);
    res.render('client/pages/home/index', {
        outstandingProducts: outstandingProducts,
        newProductsList: newProductsList,
        pageTitle: "Trang chủ"
    });
}