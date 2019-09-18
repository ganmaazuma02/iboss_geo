const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    user_national_id: {
        type: String,
        required: true,
        minlength: 12,
        maxlength: 12
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    current_task: {
        type: String,
        required: true
    },
    update_date: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = Location = mongoose.model('location', LocationSchema, 'locations');