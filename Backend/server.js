import dotenv from  'dotenv';
import express from 'express';
import userRouter from './src/fetaures/users/user.router.js';
import taskRouter from './src/fetaures/tasks/task.router.js';
import mongoDBconnection from './src/config/mongoDB.js';
dotenv.config();

const app = express();
app.use(express.json());


// Routers
app.use("/api", userRouter)
app.use("/api", taskRouter)

app.listen(3360, ()=>{
console.log("Server is Runing on Port 3360")
mongoDBconnection();
})

