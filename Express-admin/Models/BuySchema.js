const mongoose=require('mongoose')

const BuySchema = new mongoose.Schema({
    image:{type:String},
    title:{type:String},
    price:{type:String},
    // productid:{type:String}
},{timestamps:true})

module.exports=new mongoose.model('buydata',BuySchema)