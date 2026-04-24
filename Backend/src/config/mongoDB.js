import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';
let url = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
let client = new MongoClient(url);
let db;

const mongoDBconnection = async()=>{
    try{
        await client.connect();
        db = client.db('SmartNotesAi');
        console.log("MongoDB Connected SucessFully !")

    }
    catch(err){
        console.log('Server Error', err)
        process.exit(1); 
    }
}

export const getDB = ()=> db;



export default mongoDBconnection

