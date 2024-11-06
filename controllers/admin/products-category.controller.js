const ProductCategory = require('../../models/product-category.model');
const tree = require('../../helpers/tree');

module.exports.index = async (req, res) => {
    const listCategory = await ProductCategory.find({delete: false});

    const newList = tree.create(listCategory, "");

    res.render('admin/pages/products-category/index',{
        listCategory: newList
    });
}

module.exports.create = async (req, res) => {

    const listCategory = await ProductCategory.find({status: "active"});
    
    const newList = tree.create(listCategory, "");
    res.render('admin/pages/products-category/create', {
        listCategory: newList
    })
}

module.exports.createPost = async (req, res) => {

    try {
        if(res.locals.permissions.role.include('products-category-edit')) {
            console.log('Có quyền thêm danh mục');
            const count = await ProductCategory.countDocuments({});
            req.body.position = parseInt(req.body.position) || (count + 1);
            const category = new ProductCategory(req.body);
            await category.save();
            req.flash("success", "Tạo danh mục thành công")
            res.redirect("/admin/products-category")
        }
        else {
            console.log('Không có quyền thêm danh mục');
            res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
        }
    } catch (error) {
        console.log(error);
        req.flash('error', 'Lỗi thêm mới danh mục sản phẩm');
        res.redirect(`back`)
    }
}


//UPDATE NHIỀU BẢN GHI
module.exports.changeStatusMulti = async (req, res) => {
    const status = req.body.status;
    const ids = req.body.ids.split(", ");
    console.log(ids);
    

    switch (status) {
        case "active":
        case "inactive":
            await ProductCategory.updateMany({
                _id: {
                    $in: ids
                }
            }, {
                status: status
            });
            break;
        case "delete-all":
            await ProductCategory.updateMany({
                _id: {
                    $in: ids
                }
            }, {
                delete: true,
                deleteAt: new Date()
            });
            break;

        case "change-position":
            ids.forEach(async item => {
                const [id, position] = item.split("-");
                console.log(position);
                
                await ProductCategory.updateOne({
                    _id: id
                }, {
                    position: position
                });
            });

        default:
            break;
    }
    req.flash('success', `Chỉnh sửa thành công ${ids.length} sản phẩm`);
    res.redirect('back')
}

//Update 1 bản ghi
module.exports.changeStatus = async (req, res) => {

    const id = req.params.id;
    const status = req.params.status;
    await ProductCategory.updateOne({
        _id: id
    }, {
        status: status
    });
    req.flash('success', 'Chỉnh sửa trạng thái thành công');
    res.redirect('back')
}

module.exports.edit = async (req, res) => {
    const listCategory = await ProductCategory.find({status: "active"});
    const newList = tree.create(listCategory, "");
    
    const category = await ProductCategory.findOne({status: "active", _id: req.params.id})
    
    res.render('admin/pages/products-category/edit.pug', {
        listCategory: newList,
        category: category
    });
}

module.exports.editPatch= async (req, res) => {
    try {
        req.body.position = parseInt(req.body.position);
        console.log(req.params);
        await ProductCategory.updateOne({_id: req.params.id}, req.body);
        req.flash("success", "cập nhật danh mục thành công");
        res.redirect('back');
    } catch (error) {
        req.flash('error', "cập nhật thất bại")
    }
}