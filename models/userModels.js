const mongoose  = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const  userSchema = mongoose.Schema({
         name:{
            type:String,
            required:true,
            trim:true,
            maxlength:[20],
            minlength:[2]
         },
         email:{
            type:String,
            required:true,
            trim:true,
            maxlength:[50],
            minlength:[6]
         },
         password:{
            type:String,
            required:true,
            trim:true,
            maxlength:[25],
            minlength:[3]
         },
         role:{
            type:String,
            enum : [1], // 1=>user
            default:1
         }
        
 
},{timestamps:true});



//hash password 
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password,10)

})
   

  // compare password
      userSchema.methods.comparePassword = async function(EnterPassword){
            return await bcrypt.compare(EnterPassword, this.password);
      }


module.exports = mongoose.model("User",userSchema);