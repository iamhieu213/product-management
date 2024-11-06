const mongoose = require('mongoose');



const roleSchema = new mongoose.Schema({
    title: String,
    description :String,
    deleted: {
        type: Boolean,
        default: false
    },
    role: {
        type: Array,
        default: []
    }
}, {timestamps: true});

const Role = mongoose.model('Role', roleSchema, "roles");

module.exports = Role;