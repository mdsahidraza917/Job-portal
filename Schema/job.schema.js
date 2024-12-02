const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
     companyName:{
        type:String,
        required:true
     },
     logoUrl:{
        type:String,
        required:true
     },
     jobPosition:{
        type:String,
        required:true
     },
     monthlySalary:{
      type:Number,
      required:true
     },
     jobType:{
      type:String,
      required:true,
      enum: ["full-time", "part-time", "contract", "internship", "freelance"],
     },
     remoteOrOffice:{
      type:String,
      required:true,
      enum: ["Remote", "Office"],
     },
     location:{
      type:String,
      required:true
     },
     jobDescription:{
      type:String,
      required:true
     },
     aboutCompany:{
      type:String,
      required:true
     },
     skillsRequired:{
      type:String,
      required:true,
      enum: ["JavaScript", "React", "HTML", "CSS", "SQL"],
     },
     information:{
      type:String,
     },
     user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
  }



})
module.exports = mongoose.model("Job",jobSchema);
