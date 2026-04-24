import dotenv from  'dotenv';
import cors from 'cors';

import express from 'express';
import userRouter from './src/fetaures/users/user.router.js';
import taskRouter from './src/fetaures/tasks/task.router.js';
import mongoDBconnection from './src/config/mongoDB.js';
dotenv.config();

const app = express();

app.use(cors({
   origin: ["http://localhost:3000"],
   methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
   allowedHeaders: ["Content-Type", "Authorization"],
   credentials: true,
   optionsSuccessStatus: 200 
}));

app.use(express.json());


// Routers
app.use("/api", userRouter)
app.use("/api", taskRouter)
// const PORT = process.env.PORT;
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', ()=>{
console.log("Server is Runing on Port 3360")
mongoDBconnection();
})

