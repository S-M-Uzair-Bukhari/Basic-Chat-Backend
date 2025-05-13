const mongoose = require("mongoose");
const chatFunctions = require("../function/Chat");

const createRoom = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const room = await chatFunctions.createRoom(req);
        res.status(200).json({
            success: true,
            msg: "Chat Room is Created!",
            data: room
        });
        await session.commitTransaction();
        session.endSession();
        return
    } catch (error) {
        console.log("Having Error :", error);
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
            success: false,
            msg: "Having Errors",
            error: error.message
        })
    }
};

const getRoom = async (req, res) => {
    try {
        const room = await chatFunctions.getRoom(req);
        return res.status(200).json({
            success: true,
            msg: "Chat Room!",
            data: room
        });
    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(400).json({
            success: false,
            msg: "Having Errors",
            error: error.message
        })
    }
};

const getMessages = async (req, res) => {
    try {
        const messages = await chatFunctions.getMessages(req);
        return res.status(200).json({
            success: true,
            msg: "All Messages By Room Id!",
            data: messages
        })
    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(400).json({
            success: false,
            msg: "Having Errors",
            error: error.message
        })
    }
}

module.exports = {
    createRoom,
    getRoom,
    getMessages
};