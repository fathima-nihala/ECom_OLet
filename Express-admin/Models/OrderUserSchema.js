const mongoose = require('mongoose')

const OrderUserSchema = new mongoose.Schema({
    address: { type: String },
    pincode: { type: String },
    city: { type: String },
    phone: { type: String },
    profileid: { type: String }

}, { timestamps: true })

module.exports = new mongoose.model('orderUserdatas', OrderUserSchema)