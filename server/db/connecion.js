const mongoose = require("mongoose");
require('dotenv').config();
const DB=process.env.MONGO_URI



mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(()=>{
    console.log(`connection successfull`)
}).catch((err)=>{
    console.log(err)
    console.log("no connection")
})