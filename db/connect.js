const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB is Successfully Connected!");
    } catch (error) {
        console.log("having Errors Connecting To DB: ", error);
    }
};

module.exports = connectDB;