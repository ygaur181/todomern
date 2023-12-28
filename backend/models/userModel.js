const { mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name : String,
    email : { type : String, unique : true},
    phone : String,
    password : String
})

const userModel = new mongoose.model("user", userSchema);

module.exports = userModel;