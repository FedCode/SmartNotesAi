import { getDB } from "../../config/mongoDB.js"
import bcrypt from 'bcrypt';
export default class UserReposistory{

constructor(){
    this.User_collection = "user"
}   

async userRegister(name, email , password){
    try{ 
        // 1 Get DataBase   
        const db = getDB();

        //2 create Collection
       const collection = await db.collection('users');
        //const hashPassw =  await bcrypt.hash(password, 10);
        const hashedPassword = await bcrypt.hash(password, 10);
       //3 Insert Document in Collection
       const new_User = collection.insertOne({name, email , password:hashedPassword,createdAt:new Date()});

       return new_User;
    }
    catch(err){
        console.log("Server Error", err)
    }
}

async userLogin(email, password){
    try{
        const db = getDB();
        const collection = await db.collection('users');
        const userMatch = await collection.findOne({email})
           
        if(!userMatch){
             return { error: "USER_NOT_FOUND" };
        }
        const matchPassword = await bcrypt.compare(password, userMatch.password);
        if (!matchPassword) {
          return { error: "INVALID_PASSWORD" };
        }
       return { user: userMatch };
    }
    catch(err){
        console.log("Server Error", err)
        return { error: "SERVER_ERROR" };

    }
}

}
