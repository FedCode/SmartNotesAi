import express from 'express';
import UserController from './user.controller.js'

const userRouter = express.Router();
const UserRegisterController = new UserController();

userRouter.post('/user/register',(req, res)=>{
UserRegisterController.userRegisterFun(req, res)
});

userRouter.post('/user/login', (req, res)=>{
UserRegisterController.loginUser(req, res)
});


export default userRouter;
