const jwt = require("jsonwebtoken");
require("dotenv").config()
module.exports = (roles = []) => {
    return (req, res, next) => {
            //    console.log(roles,"bbbbbbbbbbb")
      let token =
        req.headers["x-access-token"] || req.headers["authorization"];
    
      if (token && token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
      }
      if(!token){
        return res.status(401).json({success:false, message:"Access denied"});
      }
        try{
               // Verify the token using your secret key
      const decoded = jwt.verify(token, process.env.Jwt_Secret_Key);
        //  console.log(decoded,"bb")
         if (roles.includes(Number(decoded.role))) {
            req.find_user = decoded; // Store the decoded user object in the request
            next(); // Allow the request to proceed
          } else {
            res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
          }


        }catch(e){
            res.status(400).json({success:false, message: 'Invalid token.' });
        }
      
    }
  };