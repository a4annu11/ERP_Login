const SignUp = require("../Models/signup");
const mongoose = require("mongoose");

exports.signup = async (req,res) =>{
    try{
        const {name, email, phone } = req.body;
        const user = await new SignUp({name, email, phone});
        const dataSave = user.save();
        res.json({
            success:true,
            msg:"Data sended succesfully",
            data: dataSave
        })

    }catch(error){
        res.status(404).json({
            success:false,
            error:error
        })
        console.log(error)
    }
}