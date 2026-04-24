import jwt from 'jsonwebtoken';

const jwtAuthorization =  async  (req, res, next)=>{
    
    try{
     const authHeader = req.headers['authorization']; 
   
        // 1. Check if header exists and starts with Bearer
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                msg: 'No Token found or invalid format', 
                success: false 
            });
        }
    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, process.env.jWT_SEC);

    req.userID = payload.id

    next()
}
catch(err){
       return res.status(401).json({ msg: "Token Expired or invalid" });
}

}

export default jwtAuthorization;
