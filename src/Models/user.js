const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    phonenumber: {
        required: true,
        type: String
    },
    point: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('Data', dataSchema)