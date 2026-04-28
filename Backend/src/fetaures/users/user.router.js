import express from 'express';
import UserController from './user.controller.js';
import jwtAuthorization from '../../middlewares/jwt.authorization.js';

const userRouter = express.Router();
// const UserRegisterController = new UserController();
const userController = new UserController();

userRouter.post('/user/register', (req, res)=>{
userController.userRegisterFun(req, res)
});

userRouter.post('/user/login', (req, res)=>{
userController.loginUser(req, res)
});

userRouter.get('/user/me', jwtAuthorization, (req, res)=>{
    userController.userGetMe(req, res)
})

userRouter.post('/user/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ success: false, msg: "Logout failed" });
        }
        res.clearCookie('connect.sid'); // The default name for express-session cookies
        return res.status(200).json({ success: true, msg: "Logged out successfully" });
    });
});


export default userRouter;
