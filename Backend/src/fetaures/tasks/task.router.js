import express  from "express";
import TaskController from './task.controller.js';
import jwtAuthorization from '../../middlewares/jwt.authorization.js'

const taskRouter = express.Router();
const taskController = new TaskController()

taskRouter.post("/task/create", jwtAuthorization, (req, res)=>{
    taskController.createTaskCont(req, res)
})

taskRouter.get("/tasks/:userID",jwtAuthorization, (req, res)=>{
    taskController.getAllTask(req, res)
})

taskRouter.post("/tasks/edit/:taskID", jwtAuthorization, (req, res)=>{
    taskController.updateTasks(req, res)
})
taskRouter.delete("/tasks/delete/:taskID" , jwtAuthorization, (req, res)=>{
    taskController.deleteUserTask(req, res)
})

export default taskRouter;

