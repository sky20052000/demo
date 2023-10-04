
const mongoose =require("mongoose");
require("dotenv").config();

const Connection = async(req,res)=>{
         const con = await mongoose.connect(process.env.Mongo_Url,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
         });
          if(!con){
            console.log("Mongoose connection failed!");
          }else{
            console.log("Mongoose connection Success!");
          }
}

module.exports = Connection;