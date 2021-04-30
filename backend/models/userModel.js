import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    // no duplicate emial in DB
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    isAdmin:{type:Boolean,default:false,required:true},

}, {
    timestamps:true,
});

// first param is model name
const User = mongoose.model("user",userSchema);
export default User;