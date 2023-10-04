require("dotenv").config();
const User = require("../models/userModels");
const  Validator = require("validator");
const jwt = require("jsonwebtoken");


const regsiterUSer = async(req,res)=>{
    try{
        //console.log(req.body,"nn")
        let {name, email,password} = req.body;
          if(!(name && email && password )){
             return res.status(400).json({success:false, message:"Manadatory fields can not be empty!"});
          }

     
          // check valid email 
           const validEmail = Validator.isEmail(email);
            if(!validEmail){
                 return res.status(400).json({success:false, message:"Please enter valid email"});
            }


            const findUser = await User.findOne({email});
               if(findUser){
                return res.status(400).json({success:false, message:"Please login with credentails"});
               }
                // save user 
                 let newUser = {
                     name,
                     email,
                     password,
                    
                 }

                 await User.create(newUser);
                  return res.status(201).json({
                    success:true,
                    message:"User register successfully"
                  });
        
      }catch(e){
              // console.log(e,"ee")
            return res.status(500).json({
                success:false,
                message:"Something went wrong!"
            });
      }
}

const  loginUser = async(req,res)=>{
    try{
        const {email,password} =  req.body;
        if(!(email && password)){
          return res.status(400).json({success:false, message:"Manadatory fields can not be empty"});
       }

       // check valid email 
        const validEmail = Validator.isEmail(email);
         if(!validEmail){
              return res.status(400).json({success:false, message:"Please enter valid email"});
         }

         // const find user 
         const find_User =  await User.findOne({email});
         if(!find_User){
          return res.status(400).json({success:false, message:"User does not exists!"});
         }

         // compare password 
         const isMatchPassword = await find_User.comparePassword(password);
          if(!isMatchPassword){
             return res.status(400).json({success:false, message:"Password mismatch!"});
          }

                  let userData = {
                    id:find_User._id,
                    name:find_User.name,
                    email:find_User.email,
                    role:find_User.role
                  }
          // generate token 
          const  token = jwt.sign({id:find_User._id, role:find_User.role}, process.env.Jwt_Secret_Key, { expiresIn: '24h' });
            return res.status(200).json({
             sucess:true,
             data:userData,
             token:token
            })  ;


    }catch(e){
    //    console.log(e,"ee")
       return res.status(500).json({
           success:false,
           message:"Something went wrong!"
       });
    }
}




const getAllUserList = async(req,res)=>{
    try{
          const findUser = await User.find({});
           if(!findUser){
              return res.status(200).json({success:true, message:"No user found!"})
           }
           

           return res.status(200).json({success:true,data:findUser});

    }catch(e){
        //   console.log(e,"ee")
      return res.status(500).json({
          success:false,
          message:"Something went wrong!"
      });
    }
}




module.exports ={
    regsiterUSer,
    loginUser,
    getAllUserList,
 

    
}