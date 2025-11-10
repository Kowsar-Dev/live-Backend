import { verifyToken } from "../middleware/jwt.js";
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient(); // Prisma


const verifyMiddleware = async (req, res, next) => {
  
  try {
      const authHeader = req.headers.authorization;
   
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    
    
 
    const decoded = verifyToken(token); 

    
    req.user = decoded; 
    next();
  } catch (err) {
    
    return res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
  }
};

export default verifyMiddleware;