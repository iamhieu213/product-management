const Product = require('../../models/product.model');
const ProductCategory = require('../../models/product-category.model');
const filterStatus = require('../../helpers/filterStatus');
const search = require('../../helpers/search');
const pagination = require('../../helpers/pagination');
const tree = require('../../helpers/tree');
const moment = require('moment');
const Account = require('../../models/account.model');
const systemConfig = require('../../config/system');
module.exports.index = async (req, res) => {
    let find = {
        delete: false,
    }
    //filter
    if (req.query.status) {
        find.status = req.query.status
    };

    const filter = filterStatus(req.query);
    //End filter

    //search
    const objSearch = search(req.query);
    if (objSearch.regex) {
        find.title = objSearch.regex
    }
    //End search

    // Pagination
    const quantityProducts = await Product.countDocuments(find);

    const paginationObj = pagination({
            limit: 4,
            currentPage: 1
        },
        req.query,
        quantityProducts
    );
    // End Pagination

    //Sort
    let sort = {};

    if (req.query.sortKey) {
        sort[req.query.sortKey] = req.query.sortValue;
    } else {
        sort.position = "desc";
    }

    //End sort
    const products = await Product.find(find)
        .sort(sort)
        .limit(paginationObj.limit)
        .skip(paginationObj.skip);

    for (const item of products) {
        const userCreate = await Account.findOne({
            _id: item.createBy.userId
        }).select('fullName');
        if (userCreate) {
            if (item.createBy) {
                item.createBy.fullName = userCreate.fullName
            }
        }
        const lastestUpdate = item.updateBy[item.updateBy.length - 1];
        if (lastestUpdate) {
            const lastestUpdateUser = await Account.findOne({_id: lastestUpdate.userId}).select('fullName');
            item.lastestUpdate = {
                fullName: lastestUpdateUser.fullName,
                updateAt: lastestUpdate.updateAt
            }
        }
    }
    res.render('admin/pages/products/products.pug', {
        title: "Trang sản phẩm",
        products: products,
        filterStatus: filter,
        keyword: objSearch.keyword,
        paginationObj: paginationObj,
        moment: moment,
    })
}

//Update 1 bản ghi - sửa trạng thái
module.exports.changeStatus = async (req, res) => {

    try {
        if(res.locals.permissions.role.includes('products-edit')) {
            const id = req.params.id;
            const status = req.params.status;
            await Product.updateOne({
                _id: id
            }, {
                status: status,
                $push: {
                    updateBy: {
                        userId: res.locals.user.id,
                        updateAt: Date.now()
                    }
                }
            });
            req.flash('success', 'Chỉnh sửa trạng thái thành công');
            res.redirect('back')
        }
    } catch (error) {
        console.log(error);
        
        req.flash('error', 'Lỗi update 1 sản phẩm');
        res.redirect('back');
    }

}


//Update nhiều bản ghi
module.exports.changeStatusMulti = async (req, res) => {
    const status = req.body.status;
    const ids = req.body.ids.split(", ");

    switch (status) {
        case "active":
        case "inactive":

            await Product.updateMany({
                _id: {
                    $in: ids
                }
            }, {
                status: status,
                $push: {
                    updateBy: {
                        userId: res.locals.user.id,
                        updateAt: Date.now()
                    }
                }
            });
            break;
        case "delete-all":
            await Product.updateMany({
                _id: {
                    $in: ids
                }
            }, {
                delete: true,
                deleteBy: {
                    userId: res.locals.user.id,
                    deleteAt: Date.now()
                }
            });
            break;

        case "change-position":
            ids.forEach(async item => {
                const [id, position] = item.split("-");
                await Product.updateOne({
                    _id: id
                }, {
                    position: position,
                    $push: {
                        updateBy: {
                            userId: res.locals.user.id,
                            updateAt: Date.now()
                        }
                    }
                });
            });

        default:
            break;
    }
    req.flash('success', `Chỉnh sửa thành công ${ids.length} sản phẩm`);
    res.redirect('back')
}

//Xóa mềm 1 bản ghi
module.exports.deleteOne = async (req, res) => {
    try {
        if(res.locals.permissions.role.include('products-delete')) {
            await Product.updateOne({
                _id: req.params.id
            }, {
                delete: true,
                deleteBy: {
                    userId: res.locals.user.id,
                    deleteAt: Date.now()
                }
            });
        }
        req.flash('success', `Xóa thành công 1 sản phẩm`);
        res.redirect('back');
    } catch (error) {
        req.flash('error', 'Lỗi xóa 1 sản phẩm');
        res.redirect('back')
    }
}

module.exports.create = async (req, res) => {
    const listCategory = await ProductCategory.find({
        status: "active"
    });
    const newList = tree.create(listCategory, "");

    res.render('admin/pages/products/create.pug', {
        title: 'Trang tạo mới sản phẩm',
        listCategory: newList
    })
}

//Tạo sản phẩm mới
module.exports.createPost = async (req, res) => {
    try {

        const permissions = res.locals.permissions.role;
        
        if(permissions.includes('products-create')) {
            console.log('Có quyền thêm mới sản phẩm');
            req.body.createBy = {
                userId: res.locals.user.id
            };
            req.body.price = parseInt(req.body.price);
            req.body.stock = parseInt(req.body.stock);
            req.body.discountPercentage = parseInt(req.body.discountPercentage) || undefined;
    
            const countProducts = await Product.countDocuments({});
            req.body.position = req.body.position || countProducts;
            const newProduct = new Product(req.body);
            await newProduct.save();
    
            req.flash("success", "Tạo mới sản phẩm thành công")
            res.redirect(`${systemConfig.prefixAdmin}/products`)
        }

        else {
            console.log('Không có quyền thêm mới sản phẩm');
            res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
        }
        
    } catch (error) {
        console.log(error);

        req.flash('error', 'Lỗi khi thêm mới sản phẩm');
        res.redirect('back')
    }
}


module.exports.edit = async (req, res) => {

    const listCategory = await ProductCategory.find({
        status: "active"
    });
    const newList = tree.create(listCategory, "");

    const id = req.params.id;
    const product = await Product.findOne({
        _id: id
    });
    res.render('admin/pages/products/edit.pug', {
        title: "Trang cập nhật sp",
        item: product,
        listCategory: newList
    });
}

module.exports.editPatch = async (req, res) => {
    try {
        if(res.locals.permissions.role.includes('products-edit')) {
            if (req.body) {
                req.body.price = parseInt(req.body.price);
    
                if (req.body.discountPercentage) {
                    req.body.discountPercentage = parseInt(req.body.discountPercentage);
                } else {
                    delete req.body.discountPercentage
                }
                if (req.position) {
                    req.body.position = parseInt(req.body.position);
                }
            }
            await Product.updateOne({_id: req.params.id}, {
                ...req.body,
                $push: {
                    updateBy: {
                        userId: res.locals.user.id,
                        updateAt: Date.now()
                    }
                }
            });
    
            req.flash("success", "Cập nhật sản phẩm thành công")
            res.redirect("back")
        }
        else{
            console.log('Không có quyền chỉnh sửa sản phẩm');
            res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
        }
    } catch (error) {
        console.log(error);
        req.flash('error', 'Lỗi cập nhật sản phẩm');
        res.redirect('back');
    }
}



module.exports.detail = async (req, res) => {

    try {
        const item = await Product.findOne({
            slug: req.params.slug
        });
        console.log(item);
        let category
        if(item.categoryID) {
            category = await ProductCategory.findOne({
                _id: item.categoryID
            });
        }
        res.render('admin/pages/products/detail.pug', {
            title: item.title,
            item: item,
            category: item.categoryID?category.title:''
        })
    } catch (error) {
        console.log(error);

        req.flash('error', 'Lỗi chi tiết sản phẩm');
        res.redirect('back')
    }
}



//Nghịch =))
module.exports.test = (req, res) => {
    res.send("Trang test");
}