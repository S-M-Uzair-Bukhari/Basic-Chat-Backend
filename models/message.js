const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    roomId: {
        type: Schema.Types.ObjectId,
        ref: "Room",
        required: true,
    },
    sender:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const messageModel = mongoose.model("Message", messageSchema);
module.exports = messageModel;
