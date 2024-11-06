const ProductCategory = require('../../models/product-category.model');
const tree = require('../../helpers/tree');
module.exports.makeCategoryTree = async (req, res, next) => {
    console.log('Lấy danh mục');
    const response = await ProductCategory.find({delete: false});
    if(response) {
        const listCategory = tree.create(response, "");
        res.locals.listCategory = listCategory;
        next();
    }
}