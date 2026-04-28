
import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import userRouter from './src/fetaures/users/user.router.js';
import taskRouter from './src/fetaures/tasks/task.router.js';
import mongoDBconnection from './src/config/mongoDB.js';

dotenv.config();

const app = express();

const corsOptions = {
  origin: "https://smartnotesaifrontend.onrender.com",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};
// 1. CORS middleware
app.use(cors(corsOptions));
// 2. Preflight - Express 5 compatible
app.options(/(.*)/, cors(corsOptions));

// 3. Body parser
app.use(express.json());

app.set('trust proxy', 1);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  cookie: {
    maxAge: 1 * 60 * 60 * 1000, // 5 Hours
    httpOnly: true,
    secure: true, // Required for 'none' or 'lax' on Render HTTPS
    sameSite: 'none' // Required if your Frontend and Backend are on different Render domains
  }
}));



// 4. Health check
app.get("/", (req, res) => {
  res.send("SmartNotesAi API is active!");
});

// 5. API Routes
app.use("/api", userRouter);
app.use("/api", taskRouter);





app.use((req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.url}`);
  res.status(404).json({ message: `Route ${req.method} ${req.url} not found` });
});
const PORT = process.env.PORT || 10000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  mongoDBconnection();
});

// import dotenv from  'dotenv';
// import cors from 'cors';

// import express from 'express';
// import userRouter from './src/fetaures/users/user.router.js';
// import taskRouter from './src/fetaures/tasks/task.router.js';
// import mongoDBconnection from './src/config/mongoDB.js';
// dotenv.config();

// const app = express();



// // const corsOptions = {
// //    origin: "https://smartnotesaifrontend.onrender.com",
// //    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
// //    allowedHeaders: ["Content-Type", "Authorization"],
// //    credentials: true,
// //    optionsSuccessStatus: 200 
// // };

// // app.use(cors(corsOptions));

// // //app.options(':path*', cors(corsOptions));
// // // app.options(cors());
// // // app.options("*", cors());
// // app.use(express.json());
// app.use(cors({
//    origin: "https://smartnotesaifrontend.onrender.com",
//    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//    allowedHeaders: ["Content-Type", "Authorization"],
//    credentials: true
// }));

// // 2. EXPLICIT OPTIONS HANDLER (Bypasses path-to-regexp)
// app.use((req, res, next) => {
//     if (req.method === 'OPTIONS') {
//         res.header("Access-Control-Allow-Origin", "https://smartnotesaifrontend.onrender.com");
//         res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
//         res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//         res.header("Access-Control-Allow-Credentials", "true");
//         return res.sendStatus(200);
//     }
//     next();
// });

// app.use(express.json());

// // ... Your API Routes here (e.g., app.use('/api/user', userRouter)) ...

// // 3. SAFE CATCH-ALL FOR FRONTEND (Only if you are serving HTML from here)
// // Using a literal regex instead of a string to avoid the parser error
// app.get(/^\/(?!api).*/, (req, res) => {
//   res.send("Backend is running. If you see this, the server is healthy!");
// });


// // Routers
// app.use("/api", userRouter)
// app.use("/api", taskRouter)
// app.get("/", (req, res) => {
//     res.send("SmartNotesAi API is active!");
// });

// // const PORT = process.env.PORT;
// const PORT = process.env.PORT || 10000;

// // app.listen(PORT, '0.0.0.0', ()=>{
// // console.log("Server is Runing on Port 3360")
// // mongoDBconnection();
// // })

// app.listen(PORT, '0.0.0.0', () => {
//     console.log(`Server is running on port ${PORT}`);
//     mongoDBconnection(); 
// });



// import dotenv from 'dotenv';
// import cors from 'cors';
// import express from 'express';
// import userRouter from './src/fetaures/users/user.router.js';
// import taskRouter from './src/fetaures/tasks/task.router.js';
// import mongoDBconnection from './src/config/mongoDB.js';

// dotenv.config();

// const app = express();

// // 1. CORS - must be first
// app.use(cors({
//   origin: "https://smartnotesaifrontend.onrender.com",
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true
// }));

// // 2. Handle preflight
// app.options('*', cors({
//   origin: "https://smartnotesaifrontend.onrender.com",
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true
// }));

// // 3. Body parser
// app.use(express.json());

// // 4. Health check route
// app.get("/", (req, res) => {
//   res.send("SmartNotesAi API is active!");
// });

// // 5. API Routes - BEFORE any catch-all
// app.use("/api", userRouter);
// app.use("/api", taskRouter);

// const PORT = process.env.PORT || 10000;

// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`Server is running on port ${PORT}`);
//   mongoDBconnection();
// });
