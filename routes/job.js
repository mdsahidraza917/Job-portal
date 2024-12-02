const express = require("express")
const router = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const Job = require("../Schema/job.schema");
const { findById } = require("../Schema/user.schema");
dotenv.config();

router.get("/",async (req,res)=>{
    const job = await Job.find();
    res.status(200).json(job);
})

router.get("/:id",async (req,res)=>{
    const {id} = req.params;
    const job = await Job.findById(id);
    if(!job){
     return res.status(404).json({message:"Job not found"}) 
    }
    res.status(200).json(job);
})
router.delete("/:id",async (req,res)=>{
    const {id} = req.params;
    const job = await Job.findById(id);
    const userId = await req.user.id;
    if(!job){
        return res.status(404).json({message:"Job not found"})
    }
    if(job.user.toString() !== userId){
        return res.status(403).json({message:"You are not authorized to delete this job"})
    }
    await job.deleteOne({_id:id});
    res.status(200).json({message:"Job deleted successfully"})
    })
router.post("/",async (req,res)=> {
    const {companyName,logoUrl,jobPosition,monthlySalary,jobType,remoteOrOffice,location,jobDescription,aboutCompany,skillsRequired,information,} =req.body;
    if(!companyName || !logoUrl || !jobPosition || !monthlySalary || !jobType || !remoteOrOffice || !location || !jobDescription || !aboutCompany || !skillsRequired){
        return res.status(400).json({message:"Please fill all the fields"})
        }
        try{
        const user = req.user;
        const job = await Job.create({
            companyName,
            logoUrl,
            jobPosition,
            monthlySalary,
            jobType,
            remoteOrOffice,
            location,
            jobDescription,
            aboutCompany,
            information,
            user:user.id
        });
        res.status(200).json(job);
    }
    catch(err){
        console.log(err);
        res.status(500).json("Error in Creating Job");
    }

}) 
router.put("/:id",async (req,res)=>{
    const {id} = req.params;
    const {companyName,logoUrl,jobPosition,monthlySalary,jobType,remoteOrOffice,location,jobDescription,aboutCompany,skillsRequired,information,} =req.body;
    const job = await Job.findById(id);
    if(!job){
        return res.status(404).json({message:"Job not found"})
        }
        const userId = await req.user.id;
        if(job.user.toString() !== userId){
            return res.status(403).json({message:"You are not authorized to update this job"});
        }
        try{
            await Job.findByIdAndUpdate(id,{
                companyName,
                logoUrl,
                jobPosition,
                monthlySalary,
                jobType,
                remoteOrOffice,
                location,
                jobDescription,
                aboutCompany,
                information,
            });
            res.status(200).json({message:"Job updated successfully"});
        }
        catch(err){
            console.log(err);
            res.status(500).json("Error in updating job");
        }
})

module.exports = router;