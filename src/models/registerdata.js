const bcrypt = require('bcrypt');
const mongoose =require("mongoose");
const validator = require("validator");
var jwt = require('jsonwebtoken');


const studentSchema = new mongoose.Schema({
   firstname:{
      type:String,
      required:true,
      
   },
   lastname:{
      type:String,
      required:true,
      
   },
   email:{
      type:String,
      required:true,
      unique:[true, "Email is already present"],
      validate(value){
         if(!validator.isEmail(value)){
            throw new Error("Invalid Email")
         }
      }
   }, 
   gender:{
      type:String,
      required:true,
      
   },
   phone:{
      type:Number,
      required:true,
      unique:true
   },
   age:{
      type:Number,
      required:true
   } ,
   password:{
      type:String,
      required:true,
      
   }, 
   cpassword:{
      type:String,
      required:true,
      
   },
   tokens:[{
      token:{
         type:String,
         required:true,
      }
   }]
   
})

studentSchema.methods.generateAuthToken = async function() {
   try {
      console.log(this._id);
      const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
      this.tokens = this.tokens.concat({token:token});
      await this.save();
      console.log(token);
      return token;
   } catch (error) {
      console.log("the error is" + error);
      throw error; 
   }
};
studentSchema.pre("save", async function(next){
   if(this.isModified("password")){
    this.password = await  bcrypt.hash(this.password,10);
    
    this.cpassword=await  bcrypt.hash(this.password,10);
   }
   next();
})

const Student = new mongoose.model('Student' ,studentSchema);

module.exports =Student;