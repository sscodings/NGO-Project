const express = require("express");
const jwt = require("jsonwebtoken");
const z = require("zod");
const mongoose = require("mongoose");
const router = express.Router();
import { Need,User,Organistation } from "../db";
import { JWT_secret } from "../config";

const signUpBody = zod.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string().min(10),
    description: z.string().min(10),
    type: z
        .enum(["Education", "Healthcare", "Environment", "Animal Welfare", "Other"])
        .optional(),
    registrationNumber: z.string().min(3),
    address: z
        .object({
        city: z.string().optional(),
        state: z.string().optional(),
        pincode: z.string().optional(),
        })
        .optional(),
});

router.post("/signup",async(req,res)=>{
    try{
        const { success } = signUpBody.safeParse(req.body);
        if(!success){
            return res.status(400).json({
                message:"Details are not correct"
            });
        }

        const existingOrg= await Organistation.findOne({
            email:req.body.email
        })

        if(existingOrg){
            return res.status(400).json({
                message:"User already exists"
            });
        }

        const existingNumber = await Organistation.findOne({
            registrationNumber:req.body.registrationNumber
        });

        if(existingNumber){
            return res.status(400).json({
                message:"Phone number already registered"
            });
        }

        const organisation = await Organistation.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            phone:req.body.phone,
            description:req.body.description,
            type:req.body.type,
            registrationNumber:req.body.registrationNumber,
            address:req.body.address

        });
        const token = jwt.sign({
            id:organisation._id,
            role:"Organisation"
        },JWT_secret,{expiresIn:"7d"});

        res.status(201).json({
        message: "Organization registered successfully",
        token,
        organization: {
            id: organization._id,
            name: organization.name,
            email: organization.email,
        },
        });
    }catch(err){
        console.error(error);
        res.status(500).json({
        message: "Server error",
        });
    }
});

const loginBody = zod.object({
    email:z.string().email(),
    password:zstring(),
    phone:z.string(),
    registrationNumber:z.string()
})

router.post("/login",async(req,res)=>{
    const { success } = loginBody.safeParse(req.body);
    if(!success){
        return res.status(400).json({
            message:"Invalid inputs"
        })
    }

    const organisation = await Organistation.findOne({
        email:req.body.email,
        password:req.body.password,
        phone:req.body.phone,
        registrationNumber:req.body.registrationNumber
    });

    if(organisation){
        const token = jwt.sign({
            id:organistaion._id,role:"Organisation"
        },JWT_secret,{expiresIn:"7d"})

        return res.json({
            token:token
        });
        return;
    }
})

module.exports= router;

