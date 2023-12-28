const mongoose = require("mongoose");


const URL = "mongodb://127.0.0.1:27017/todoDb";

const connect=()=>{
    mongoose.connect(URL).then(()=>{
        console.log("database connected");
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports = {
    connect
};

