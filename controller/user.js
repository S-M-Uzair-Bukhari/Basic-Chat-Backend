const mongoose = require("mongoose");
const userFunction = require("../function/user");
const validation = require("../function/validation");
const { verify } = require("jsonwebtoken");

const signUp = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const validate = await validation.validateEmail(req);
        if(validate){
            res.status(200).json({
                success: false,
                msg: "Email Already Exist!"
            });
            await session.abortTransaction();
            session.endSession();
            return
        } else {
            const user = await userFunction.signUp(req, session);
            res.status(200).json({
                success: true,
                msg: "User Signed Up Successfully!",
                data: user
            });
            await session.commitTransaction();
            session.endSession();
        }
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.log("Having Errors :", error)
        return res.status(400).json({
            success: false,
            msg: "Having Errors!",
            error: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const validate = await validation.validateEmail(req);
        if(!validate){
            return res.status(200).json({
                success: false,
                msg: "Email not Found!"
            })
        } else {
            const { password } = req.body;
            const user = await userFunction.getUser(req);
            const hash = user.password;
            const verify = await validation.verifyPassword(password, hash);
            if(!verify){
                return res.status(200).json({
                    success: false,
                    msg: "Wrong password"
                })
            } else {
                return res.status(200).json({
                    success: true,
                    msg: "User Logged In!",
                    data: {
                        id: user._id,
                        email: user.email
                    }
                })
            }
        }
    } catch (error) {
        console.log("Having Errors :", error)
        return res.status(400).json({
            success: false,
            msg: "Having Errors!",
            error: error.message
        });
    }
};

const getUser = async (req, res) => {
    try {

    } catch (error) {
        console.log("Having Errors :", error)
        return res.status(400).json({
            success: false,
            msg: "Having Errors!",
            error: error.message
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userFunction.getAllUsers(req);
        if(users.length === 0){
            return res.status(200).json({
                success: false,
                msg: "No users Found"
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: "All Users!",
                data: users
            })
        }
    } catch (error) {
        console.log("Having Errors :", error)
        return res.status(400).json({
            success: false,
            msg: "Having Errors!",
            error: error.message
        });
    }
};

const updateUser = async (req, res) => {
    try {
        
    } catch (error) {
        console.log("Having Errors :", error)
        return res.status(400).json({
            success: false,
            msg: "Having Errors!",
            error: error.message
        });
    }
};

module.exports = {
    signUp,
    login,
    getUser,
    getAllUsers,
    updateUser
};