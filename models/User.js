const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    national_id: {
        type: String,
        required: true,
        minlength: 12,
        maxlength: 12
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {   // 3 roles: admin, manager, employee
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    register_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema, 'users');