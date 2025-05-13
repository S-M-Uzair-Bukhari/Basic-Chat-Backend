const express = require("express");
const router = express.Router();
const userController = require("../controller/user");

router.post("/user/signup", userController.signUp);
router.post("/user/login", userController.login);
router.get("/user/getUser", userController.getUser);
router.get("/user/getAllUsers", userController.getAllUsers);

module.exports = router;
