const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    users:[{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
});

const roomModel = mongoose.model("Room", roomSchema);
module.exports = roomModel;
