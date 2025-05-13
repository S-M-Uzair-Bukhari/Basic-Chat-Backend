const roomModel = require("../models/room");
const messageModel = require("../models/message");

const createRoom = async (req) => {
    const { name, users } = req.body;
    const newRoom = new roomModel({
      name,
      users  
    })
    const result = await newRoom.save();
    return result;
}; 

const getRoom = async (req) => {
    const {users} = req.query;
    const room = await roomModel.findOne({ users: {$all: users}});
    return room;
};

const createMessage = async (message) => {
    // console.log("object :", message.roomId);
    // return
    const newMessage = new messageModel({
        roomId: message.roomId,
        sender: message.sender,
        message: message.message
    });
    const result = await newMessage.save();
    console.log("saved :", result);
};

const getMessages = async (req) => {
    const { roomId } = req.query;
    const messages = await messageModel.find({roomId, roomId}).sort({timestamp: 1});
    return messages;
};

module.exports = {
    createRoom,
    getRoom,
    createMessage,
    getMessages
};