const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
import { Need, User } from "../db";
const router = express.Router();
import { JWT_secret } from "../config";
import { authenticate } from "../Middlewares";
const mongoose = require("mongoose");

const signupBody = zod.object({
    name:zod.string(),
    email:zod.string(),
    password:zod.string(),
    phone:zod.string(),
    bio:zod.string(),
    skills:zod.array(zod.string()),
});

router.post("signup",async(req,res)=>{
    try{
        const result = signupBody.safeParse(req.body);
        if(!result.success){
            return res.status(400).json({
                message:"Invalid credentials"
            })
        }

        const data = result.data;

        const existingUser = await User.findOne({
            email:data.email
        });

        if(existingUser){
            return res.status(400).json({
                message:"User alreaady exists"
            })
        }

        const user = await User.create({
            name:data.name,
            email:data.email,
            password:data.password,
            phone:data.phone,
            bio:data.bio,
            skills:data.skills
        });

        const token = jwt.sign(
            {id:user._id,role:"user"},
            JWT_secret,
            {expiresIn:"7d"}
        );

        res.status(200).json({
            message:"user registered successfully",
            token:token,
        })
    }catch(err){
        return res.status(500).json({
            messgae:"There is some error"
        })
    }
})

const loginBody = zod.object({
    email:zod.string(),
    password:zod.string(),
});

router.post("/login",async(req,res)=>{
    const { success } = loginBody.safeParse(req.body);
    if(!success){
        return res.status(400).json({
            message:"Enter the valid details"
        })
    }

    const userExists = await User.findOne({
        email:req.body.email,
        password:req.body.password
    });

    if(userExists){
        const token = jwt.sign({id:user._id,role:"user"},
            JWT_secret,
            {expiresIn:"7d"}
        )
    }
    res.status(200).json({
        message:"Signin Successful"
    })
});

router.post("/apply/:needId",authenticate,async(req,res)=>{
    try{
        const userId = req.user.id;
        const {needId} = req.params;

        const need = await Need.findById(needId);
        if(!need){
            return res.status(400).json({
                message:"Need does not exist"
            })
        }

        const user = await User.findById(userId);

        if (user.appliedNeeds.includes(needId)) {
            return res.status(400).json({
                message: "Already applied",
            });
        }

        need.applicants.push({
            user:userId,
            status:"pending"
        });

        await need.save();
        await User.findByIdAndUpdate(userId,{
            $push:{appliedNeeds:needId}
        });

        res.status(200).json({
            message:"Apploed successfully"
        });
    }catch(err){
        return res.status(400).json({
            message:"Something went wrong"
        })
    }
    

});

router.get("/all",authenticate,async(req,res)=>{
    try{
        const search = req.query;

        let query={};
        if(search){
            query = {
                $or:[
                    {title:{$regex:search , $options:"i"}},
                    {description:{$regex:search , $options:"i"}},
                    {skillsRequired:{$regex:search,$options:"i"}},
                ]

            }

            
        }

        const needs = await Need.find(query)
        .populate("organization","name")
        .sort({createdAt:-1});


        return res.status(200).json(needs);
    }catch(err){
        return res.status(400).json({
            message:"Cannot fetch needs"
        })
    }
})



module.exports = router;

