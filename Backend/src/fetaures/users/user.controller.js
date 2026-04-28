// import UserModel from "./user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import UserReposistory from './user.Reposistory.js'
import { getDB } from "../../config/mongoDB.js";

export default class UserController{
    constructor(){
         this.userReposistory = new UserReposistory();

    // Bind methods to preserve 'this'
    this.userRegisterFun = this.userRegisterFun.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.userGetMe = this.userGetMe.bind(this);
    }
async userRegisterFun(req, res){
    try{
        const {name, email , password} = req.body;

        
        if(!name || !email || !password){
            return res.status(400).json({msg:"Please Enter field First"})
        }
      
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({msg:"Please Enter Vaild email ID "})
        }
        const db = getDB();
        const findExitingEmail = await db.collection('users').findOne({email}) 
        if(findExitingEmail){
            return res.status(409).json({msg:'User Email In use', success:false})  
        }
       //const userRegister =  await UserModel.userRegister(name, email , password);

        const userRegister =  await this.userReposistory.userRegister(name, email , password);

       return res.status(201).json({msg:'User Register Sucessfully', user:userRegister, success:true})  
     }
    catch(err){
        console.log("Error", err)
          return res.status(500).json({ msg: "Internal server error", success: false }); // ✅ add this

    }
}
async loginUser(req, res){
    try{
        const {email , password} = req.body;
        // const userlogin =  await UserModel.userLogin(email , password);
        const result =  await this.userReposistory.userLogin(email , password);
        //const result =  await this.userReposistory.userLogin(email , password);
        if(result.error){
            const statusCode = result.error === "USER_NOT_FOUND" ? 404:401
            return res.status(statusCode).json(
                {msg: result.error, 
                success: false}
            )
        }
    
        // 2. If no error, extract the user data
        const user = result.user;
        const token = jwt.sign(
            {
             id:user._id.toString(),
          },
          process.env.JWT_SEC,{
             expiresIn: "1h"
        })
        // Then store that token inside the session
        req.session.token = token;
       return res.status(200).json({msg:'User Login Sucessfully', user:user,  success:true})  
     }
    catch(err){
        console.log("Error", err)
          return res.status(500).json({ msg: "Internal server error", success: false }); // ✅ add this

    }
}


async userGetMe(req, res){
    try{
        const userid = req.userID

        if (!userid) {
                return res.status(401).json({ success: false, msg: "Unauthorized" });
            }

         const user = await this.userReposistory.userGetmeRepo(userid);


         if (!user) {
                return res.status(404).json({ 
                    success: false, 
                    loggedIn: false, 
                    msg: "User not found" 
                });
            }

            // 3. Return success to React
            // We return loggedIn: true so the frontend knows the session is active
            res.status(200).json({ 
                success: true, 
                loggedIn: true, 
                user 
            });

    }
    catch(err){
        console.error("Controller Error in getMe:", err);
        res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
}
}
