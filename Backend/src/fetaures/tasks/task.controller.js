import TaskReposistory from './task.reposistory.js';

export default class TaskController{
  constructor(){
    this.taskRepo = new TaskReposistory();
  }
async createTaskCont(req, res){
    try{
       const taskData = req.body.tasks;
       const userID = req.userID;
       
       const newTask = await this.taskRepo.createTask(taskData, userID)

       if(!newTask){
        

        return res.status(400).json({msg:'Task not added', success:false})

       }

        return res.status(201).json({ success:true, msg:"Task created Easily", task:newTask })
    }
    catch(err){
        console.log("Server Error", err)
        return res.status(500).json({ error: "Server Error", message: err.message });
    }
} 


async getAllTask(req, res){
  try{
   const userID = req.params.userID;
   const alltask = await this.taskRepo.getAllTaskList(userID);

   if(alltask.error){
     const statusCode  = statusCode.error === "Task Not Found" ? 400:500;
     return res.status(statusCode).json({msg:alltask.error, success:false})
   }
   return res.status(200).json({ success:true, msg:"All Task Getched Easily", task:alltask })

  }
  catch(err){
    console.log("Server Error", err)

  }
}

async updateTasks(req, res){
  try{
    const userID = req.userID;
    const taskID  = req.params.taskID;
     const {title, content,category, priority } = req.body;
   
    const editTasks =  await this.taskRepo.editTaskByID(  userID,taskID, { title, content,category, priority} )
   if(editTasks.error)  {
     const statusCode  = editTasks.error === "Task Not Found" ? 400:500;
     return res.status(statusCode).json({msg:editTasks.error, success:false})
   }
  return res.status(200).json({ success:true, msg:"Task is Updated Sucessfully", task:editTasks })
  }
  catch(err){
    console.log("Server Error", err)
  }
}
// Used $push to add task → use $pull to remove task ✅
// Used insertOne to add document → use deleteOne to remove document

// Same logic applies for update too:

// $set → updates a field in document
// $push → adds to array
// $pull → removes from array
// updateOne → modifies document
// deleteOne → removes whole document
// OperationBest Used For...updateOne()Modifying a single document's 
// specific fields.updateMany()Modifying multiple documents that match a criteria (e.g., mark all "Pending" as "Expired").replaceOne()
// Swapping an entire document for a new one while keeping the same ID.findOneAndUpdate()Updating a document and returning either the old or the new version in the same call.

async deleteUserTask(req, res){
  try{
    const userID = req.userID;
    const taskID =  req.params.taskID;

    const result = await this.taskRepo.deleteTaskByID(userID, taskID);

    if(result.error){
     return res.status(400).json({ success: false, msg: result.error });
    }
    return res.status(200).json({ success:true, msg:"Task is Deleted Sucessfully", task:result.modifiedCount })

  }
  catch(err){
    console.log("Server Error", err)
  }
}

async checkStatus(req, res){
  try{
    const taskID = req.params.taskID;
    const {status} = req.body;
    const toggleStatus = await this.taskRepo.checkTaskStatus(taskID, status)

    if(toggleStatus.error){
     return res.status(400).json({ success: false, msg: toggleStatus.error });
    }
    return res.status(200).json({ success:true, msg:"Task is Deleted Sucessfully", status:toggleStatus.modifiedCount })

  }
  catch(err){

  }
}

}