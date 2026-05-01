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
            taskID: new ObjectId(),
            userID:userID,
            tasks:taskData,
            status:'pending',
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

async editTaskByID(userID, taskID, taskslist){
    try{
        const { title, content, category, priority } = taskslist;  // ✅ inside try
        const db = getDB();
        const collection = db.collection('tasks');

        const result = await collection.updateOne(
            { userID: new ObjectId(userID) },
            { $set: {
                "tasks.$[elem].tasks.title":    title,
                "tasks.$[elem].tasks.content":  content,
                "tasks.$[elem].tasks.category": category,
                "tasks.$[elem].tasks.priority": priority,
                "tasks.$[elem].updatedAt":      new Date()
            }},
            { arrayFilters: [{ "elem.taskID": new ObjectId(taskID) }] }
        );

        if(result.matchedCount === 0){
            return { error: "Task not found" };
        }
        return { success: true, modifiedCount: result.modifiedCount };
    }
    catch(err){
        console.log("Server Error", err);
        return { error: "Internal Server Error" };
    }
}


 async deleteTaskByID(userID, taskID){
    try{
        const db = getDB();
        const collection = await db.collection('tasks');
        const removeTask = await collection.updateOne(
            {userID:new ObjectId(userID)},
            {$pull:{tasks:{taskID:new ObjectId(taskID)}}}

        )
         console.log("Delete result:", removeTask);
        if(removeTask.modifiedCount === 0 ){
            return{error:'Task not delete'}
        }
        return{success: true, modifiedCount: removeTask.modifiedCount}
    }
    catch(err){
        console.log("Server Error", err)
    }
 }


 async checkTaskStatus(taskID, status){
   try{
       const db = getDB();
       const collection = db.collection('tasks')

       const result = await collection.udateOne(
        {taskID:new ObjectId(taskID)},
        {$set:{"tasks.status":status}}
    )
     if(result.matchedCount === 0){
            return { error: "Status not Updated" };
     }
      return { success: true, modifiedCount: result.modifiedCount };

   }
   catch(err){
       console.log("Server Error", err);
   }
 }


     
}


