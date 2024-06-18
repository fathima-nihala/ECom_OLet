const mongoose=require('mongoose')

const userEcomSchema=new mongoose.Schema({
    firstname:{type:String},
    email:{type:String},
    password:{type:String},
    image:{type:String},
},{timestamps:true})

module.exports=mongoose.model("Ecom",userEcomSchema)