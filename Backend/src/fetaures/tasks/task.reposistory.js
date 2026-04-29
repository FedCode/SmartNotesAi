import { getDB } from "../../config/mongoDB.js";
import {ObjectId} from 'mongodb'

export default class TaskReposistory{

constructor(){
    this.taskCollection = 'tasks'
}

async createTask(taskData, userID){
        try{
            const db = getDB();
           const collection = db.collection('tasks')
           // 1. Manually create the specific entry we are pushing
        // This ensures we can return the DATA, not just the "Success" message
        const newTaskEntry = {
            ...taskData , // title, content, category, priority
            taskID: new ObjectId(),
            userID: userID,
            createdAt: new Date()
        };
           // const taskCreated =  await db.collection(this.taskCollection).insertOne({  userID:userID,tasks:{...taskData}, createdAt:new Date(), updatedAt:new Date() }); 
            //Cereate A task using

            const filter = {userID:new ObjectId(userID)}
            const update = {
                $push:{tasks:newTaskEntry},
                $set: { updatedAt: new Date() }
            }
            const taskCreated =  await collection.updateOne(filter, update, {upsert:true});
            //const taskCreated =  await db.collection(this.taskCollection).insertOne({  userID:userID,tasks:{...taskData}, createdAt:new Date(), updatedAt:new Date() }); 
            if (taskCreated.acknowledged) {
                 return newTaskEntry; // Return the actual data created
              }

            
           return { error: "Task not inserted" };
            
        }
        catch(err){
          console.log("Server Error", err)
        }
    }

    


    async getAllTaskList(userID){
        try{
            const db = getDB();
            const collection  = await db.collection('tasks');
            const findCollections = await collection.findOne({userID:new ObjectId(userID)})
            console.log("Query userID:", userID);
            console.log("Found tasks:", findCollections);
            if(!findCollections){
                 return {taskList: []}
            }
        return { taskList: findCollections.tasks || [] }
        }
        catch(err){
            console.log("Server Error", err)
        }
    }

  async editTaskByID(userID, taskID, tasks){
    try{
       const db = getDB();
       const collection = await db.collection('tasks');

       const result =  await collection.updateOne(
        {userID:userID,
         _id:new ObjectId(taskID)}, // Filter // $set is used to update if Not there it will add new Object
        {$set:{tasks:tasks
                //    title: tasks.title,
                //     content: tasks.content,
                //     category: tasks.category,
                //     priority: tasks.priority,
                //     updatedAt: new Date()
        }} 

       )
       if(result.matchedCount === 0){
         return {error:"Task is Not Found"}

       }
        return {success: true, modifiedCount: result.modifiedCount}
    }
    catch(err){
        console.log("Server Error", err)
        return { error: "Internal Server Error" };
    } 
 }  


 async deleteTaskByID(userID, taskID){
    try{
        const db = getDB();
        const collection = await db.collection('tasks');
        const removeTask = await collection.deleteOne({userID:userID, _id:new ObjectId(taskID)})

        if(removeTask.modifiedCount === 0 ){
            return{error:'Task not delete'}
        }
        return{success: true, modifiedCount: removeTask.modifiedCount}
    }
    catch(err){
        console.log("Server Error", err)
    }
 }



     
}


