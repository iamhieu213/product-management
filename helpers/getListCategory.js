const ProductCategory = require('../models/product-category.model');
const { find } = require('../models/product.model');
module.exports.getCategoryList = async (category) => {
    const getList = async (category) => {
        const newList = await ProductCategory.find({
            delete: false,
            parentID: category.id
        });
    
        let res = [...newList];
        for (const item of newList) {
            const child = await getList(item);
            res = res.concat(child)
        }
        
        return res;
    }

    const result = await getList(category);
    return result;
}