const userModel = require("../models/user");
const bcrypt = require("bcrypt");

const validateEmail = async (req) => {
    const { email } = req.body;
    const existing = await userModel.findOne({email: req.body.email});
    console.log("Exist :", existing)
    if(existing){
        return true
    } else {
        return false
    }
};

const verifyPassword = async (password, hash) => {
    const match = await bcrypt.compare(password, hash);
    console.log("Testing :", match);
    return match
};

module.exports = { 
    validateEmail,
    verifyPassword
};