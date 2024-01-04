const { mongoose } = require("mongoose");

const dbSchema = mongoose.Schema({
    taskName : String,
    userId : {
        type : String,
        required : true
    },
    timestamp: { type: Date, default: Date.now},
    completed : { type : Boolean, default : false},
    updatedAt : { type : Date }
})

const dbModel = mongoose.model("todoModel", dbSchema);

module.exports = dbModel;