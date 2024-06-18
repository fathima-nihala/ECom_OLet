const mongoose = require('mongoose')

const Productschema = new mongoose.Schema({
    category: { type: String },
    type: { type: String },
    title: { type: String },
    description: { type: String },
    mrp: { type: String },
    stock: { type: String },
    price: { type: String },
    image: { type: String },
    item: { type: String },
}, { timelaps: true })

module.exports = new mongoose.model("productdetails", Productschema)