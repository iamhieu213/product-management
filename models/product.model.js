const mongoose = require('mongoose');


slug = require('mongoose-slug-updater');
mongoose.plugin(slug);


const productSchema = new mongoose.Schema({
    title: String,
    description :String,   
    price: Number,
    discountPercentage: Number,
    rating: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    categoryID: {
        type: String,
        default: ""
    },
    createBy : {
        userId: String,
        createAt: {
            type: Date,
            default: Date.now
        }
    },

    deleteBy: {
        userId: String,
        deleteAt: Date
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
    updateBy: [
        {
            userId: String,
            updateAt: Date
        }
    ],
    stock: Number,
    isOuStanding: String,
    position: Number,
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema, "products");

module.exports = Product;