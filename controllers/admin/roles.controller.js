const Role = require('../../models/roles.model');

module.exports.index = async (req, res) => {

    const roles = await Role.find({
        deleted: false
    });

    res.render('admin/pages/roles/index', {
        roles: roles
    })
}

module.exports.create = (req, res) => {
    res.render('admin/pages/roles/create')
}

module.exports.createPost = async (req, res) => {
    try {
        const permission = Role(req.body);
        await permission.save();
        req.flash('success', 'Tạo mới thành công')
    } catch (error) {
        req.flash('error', 'Tạo mới thất bại')
    }

    res.redirect('/admin/roles');
}

module.exports.edit = async (req, res) => {
    const per = await Role.findOne({
        _id: req.params.id
    })
    res.render('admin/pages/roles/edit', {
        title: "Trang chỉnh sửa",
        item: per
    })
}

module.exports.editPatch = async (req, res) => {
    try {
        await Role.updateOne({
            _id: req.params.id
        }, req.body);
        req.flash('success', 'Cập nhật thành công')
    } catch (error) {
        req.flash('error', 'Cập nhật thất bại')
    }

    res.redirect('back');
}

module.exports.permissions = async (req, res) => {
    try {
        const roles = await Role.find({
            deleted: false
        });

        res.render('admin/pages/roles/permissions', {
            roles: roles
        })
    } catch (error) {
        res.redirect('back')
    }
}

module.exports.permissionsPatch = async (req, res) => {
    try {
        const data = JSON.parse(req.body.data);
        
        data.forEach(async item => {
            await Role.updateOne({_id: item.id}, {
                role: item.permissions
            })
        })
        req.flash('success', "cập nhật thành công")
        res.redirect('back')
        
    } catch (error) {
        req.flash('error', "cập nhật thất bại");
        res.redirect('back')
    }
}