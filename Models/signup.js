const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:Number
    }
})

module.exports = new mongoose.model("SignUp", signupSchema);