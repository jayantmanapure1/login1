require('dotenv').config()
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
   console.log("connection is Successfully")
}).catch((e)=>{
   console.log("No connection");
});