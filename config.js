const mongoose = require('mongoose');

require('dotenv').config();

const connection = async () =>{
    try {
        await mongoose.connect(process.env.URL);
        console.log("DB connected successfully");
    }
    catch(error){
        console.log("Error hai bhai "+error);
    }
}

module.exports = connection;