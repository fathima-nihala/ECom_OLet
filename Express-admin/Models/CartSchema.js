const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    title:{type:String},
    price:{type:Number},
    itemQuantity:{type:Number},
    image:{type:String},
    mrp:{type:String},
    orderId:{type:String}
},{timestamps:true})

module.exports=new mongoose.model("cartData",CartSchema)
