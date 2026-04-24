import dotenv from  'dotenv';
import cors from 'cors';

import express from 'express';
import userRouter from './src/fetaures/users/user.router.js';
import taskRouter from './src/fetaures/tasks/task.router.js';
import mongoDBconnection from './src/config/mongoDB.js';
dotenv.config();

const app = express();



// const corsOptions = {
//    origin: "https://smartnotesaifrontend.onrender.com",
//    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//    allowedHeaders: ["Content-Type", "Authorization"],
//    credentials: true,
//    optionsSuccessStatus: 200 
// };

// app.use(cors(corsOptions));

// //app.options(':path*', cors(corsOptions));
// // app.options(cors());
// // app.options("*", cors());
// app.use(express.json());
app.use(cors({
   origin: "https://smartnotesaifrontend.onrender.com",
   methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
   allowedHeaders: ["Content-Type", "Authorization"],
   credentials: true
}));

// 2. EXPLICIT OPTIONS HANDLER (Bypasses path-to-regexp)
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Origin", "https://smartnotesaifrontend.onrender.com");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
        res.header("Access-Control-Allow-Credentials", "true");
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json());

// ... Your API Routes here (e.g., app.use('/api/user', userRouter)) ...

// 3. SAFE CATCH-ALL FOR FRONTEND (Only if you are serving HTML from here)
// Using a literal regex instead of a string to avoid the parser error
app.get(/^\/(?!api).*/, (req, res) => {
  res.send("Backend is running. If you see this, the server is healthy!");
});


// Routers
app.use("/api", userRouter)
app.use("/api", taskRouter)
app.get("/", (req, res) => {
    res.send("SmartNotesAi API is active!");
});

// const PORT = process.env.PORT;
const PORT = process.env.PORT || 10000;

// app.listen(PORT, '0.0.0.0', ()=>{
// console.log("Server is Runing on Port 3360")
// mongoDBconnection();
// })

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
    mongoDBconnection(); 
});
