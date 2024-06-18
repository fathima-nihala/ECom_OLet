    const mongoose=require('mongoose')

    const UserSchema=new mongoose.Schema({
        firstname:{type:String},
        email:{type:String},
        password:{type:String},
        type:{type:String},
        image:{type:String},
        // isAdmin:{default:true}
    },{timestamps:true})
    module.exports=new mongoose.model("User",UserSchema)