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
   
    const editTasks =  await this.taskRepo.editTaskByID(userID,taskID, req.body)
   if(editTasks.error)  {
     const statusCode  = statusCode.error === "Task Not Found" ? 400:500;
     return res.status(statusCode).json({msg:alltask.error, success:false})
   }
  return res.status(200).json({ success:true, msg:"Task is Updated Sucessfully", task:editTasks })
  }
  catch(err){
    console.log("Server Error", err)
  }
}

async deleteUserTask(req, res){
  try{
    const userID = req.userID;
    const taskID =  req.params.taskID;

    const result = await this.taskRepo.deleteTaskByID(userID, taskID);

    if(result.error){
      const statusCode = statusCode.error === "Task not delete" ? 400:500
    }
    return res.status(200).json({ success:true, msg:"Task is Deleted Sucessfully", task:result.modifiedCount })

  }
  catch(err){
    console.log("Server Error", err)
  }
}

}