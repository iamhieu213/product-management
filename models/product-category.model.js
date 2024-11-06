const mongoose = require('mongoose');


slug = require('mongoose-slug-updater');
mongoose.plugin(slug);


const productCategorySchema = new mongoose.Schema({
    title: String,
    description :String,   
    thumbnail: String,
    status: String,
    parentID: {
        type: String,
        default: ""
    },
    slug: { 
        type: String, 
        slug: "title",
        unique: true
    },
    delete: {
        type: Boolean,
        default: false,
    },
    position: Number,
    deleteAt: Date
}, {timestamps: true});

const ProductCategory = mongoose.model('ProductCategory', productCategorySchema, "products-category");

module.exports = ProductCategory;