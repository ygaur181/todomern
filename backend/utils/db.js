const mongoose = require("mongoose");

const connect=()=>{
    const URL = process.env.MONGO_URL;
    mongoose.connect(URL).then(()=>{
        console.log("database connected");
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports = {
    connect
};

