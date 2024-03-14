const express = require("express");
const router = express.Router();

const {signup} = require('../controllers/signupController');
router.get("/",
    (req,res)=> res.send("Hello from backend"));
router.post("/signup", signup);


module.exports = router;