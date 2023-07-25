require('dotenv').config()
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://jayantmanapure5:ekQamG55zP3tuNW1@cluster0.40vzaaa.mongodb.net/")
.then(()=>{
   console.log("connection is Successfully")
}).catch((e)=>{
   console.log("No connection");
});