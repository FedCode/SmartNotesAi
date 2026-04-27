import express from 'express';
import UserController from './user.controller.js'

const userRouter = express.Router();
// const UserRegisterController = new UserController();
const userController = new UserController();

userRouter.post('/user/register',(req, res)=>{
userController.userRegisterFun(req, res)
});

userRouter.post('/user/login', (req, res)=>{
userController.loginUser(req, res)
});


export default userRouter;
