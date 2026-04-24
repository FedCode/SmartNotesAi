import UserModel from "./user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import UserReposistory from './user.Reposistory.js'
import { getDB } from "../../config/mongoDB.js";

export default class UserController{
    constructor(){
        this.userReposistory = new UserReposistory()
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
    }
}
async loginUser(req, res){
    try{
        const {email , password} = req.body;
        // const userlogin =  await UserModel.userLogin(email , password);
        const result =  await this.userReposistory.userLogin(email , password);
        //const result =  await this.userReposistory.userLogin(email , password);
        if(result.error){
            const statusCode = result.error === " USER_NOT_FOUND" ? 404:401
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
       return res.status(200).json({msg:'User Login Sucessfully', user:user, token:token, success:true})  
     }
    catch(err){
        console.log("Error", err)
    }
}

}
