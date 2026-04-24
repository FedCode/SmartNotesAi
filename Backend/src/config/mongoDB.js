import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';

let client = new MongoClient("mongodb://127.0.0.1:27017");
let db;

const mongoDBconnection = async()=>{
    try{
        await client.connect();
        db = client.db('SmartNotesAi');
        console.log("MongoDB Connected SucessFully !")

    }
    catch(err){
        console.log('Server Error', err)
    }
}

export const getDB = ()=> db;



export default mongoDBconnection

