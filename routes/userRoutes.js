const express = require("express");
const userController = require("../controller/userController");
const userRouter = express.Router();
const Role = require("../middleware/auth");
userRouter.use(express.json());
userRouter.use(express.urlencoded({ extended: true }));

userRouter.post("/register", userController.regsiterUSer);
userRouter.post("/login", userController.loginUser);
userRouter.get("/find_all_user",Role([1]), userController.getAllUserList);



module.exports = userRouter;