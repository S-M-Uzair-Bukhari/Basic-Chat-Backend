const userModel = require("../models/user");
const bcrypt = require("bcrypt");

const signUp = async (req,  session) => {
    const hash = await bcrypt.hash(req.body.password, 10);
    const newUser = new userModel(req.body);
    newUser.password = hash;
    const result = await newUser.save({ session });
    return result    
};

const getUser = async (req) => {
    const user = await userModel.findOne({email: req.body.email});
    return user
};

const getAllUsers = async (req) => {
    const users = await userModel.find().select("-password");
    return users
};

const updateUser = async () => {

};

module.exports = {
    signUp,
    getUser,
    getAllUsers,
    updateUser
};