const express = require('express');
const app = express();
require("dotenv").config()


//defining port
const port = process.env.PORT;
console.log(port)

// defining routes
app.use(express.json());

const routes = require('./Routes/routes');
app.use("/upload",routes);


// listening to port
app.listen(port, () => {
    console.log("Server started at port " + port + " Succesfully");
})

// connecting to DB
const connectDB = require("./config");
connectDB();