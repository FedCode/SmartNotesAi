 import jwt from 'jsonwebtoken';

// const jwtAuthorization =  async  (req, res, next)=>{
    
//     try{
//      const authHeader = req.headers['authorization']; 
   
//         // 1. Check if header exists and starts with Bearer
//         if (!authHeader || !authHeader.startsWith('Bearer ')) {
//             return res.status(401).json({ 
//                 msg: 'No Token found or invalid format', 
//                 success: false 
//             });
//         }
//     const token = authHeader.split(' ')[1];
//     const payload = jwt.verify(token, process.env.JWT_SEC);

//     req.userID = payload.id

//     next()
// }
// catch(err){
//        return res.status(401).json({ msg: "Token Expired or invalid" });
// }

// }

const jwtAuthorization =  (req, res, next)=>{
     try{
        //const token = req.session.token;
        const token = req.session?.token || req.headers.authorization?.split(" ")[1];

        if(!token){
            return res.status(401).json({msg:'No Session found. Please login again.', success: false})
        }

        // 2. Verify using your JWT Secret
        // Note: Make sure process.env.JWT_SEC matches your .env key name
        const payload = jwt.verify(token, process.env.JWT_SEC)

        // 3. Attach the ID to the request object for the next routes
         req.userID = payload.id
        next();  
     }
     catch(err){
        // If token is tampered with or expired
        return res.status(401).json({ 
            msg: "Session Expired or invalid", 
            success: false 
        });
     }
}


export default jwtAuthorization;
