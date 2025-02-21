import mongoose from "mongoose";
const transactionSchema =new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    amount:{type:Number,required:true},
    type:{type:String,enum:['Income','Expense'],required:true},
    description:{type:string,required:true},
    
})