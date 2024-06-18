const mongoose = require('mongoose')
// const {objectId} = require('mongodb')

const ConfirmOrder = new mongoose.Schema({
    orderId: { type: String },
    products: {}
}, { timestamps: true })

module.exports = new mongoose.model('confirm', ConfirmOrder)