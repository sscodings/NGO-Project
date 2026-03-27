const express = require("express");
const jwt = require("jsonwebtoken");
const z = require("zod");
const mongoose = require("mongoose");
const router = express.Router();
import { Need,User,Organistation } from "../db";
import { JWT_secret } from "../config";
import { authenticate } from "../Middlewares";

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
});

const needSchema = z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(["Volunteer", "Donation", "Event", "Other"]),

    location: z
        .object({
        city: z.string(),
        state: z.string(),
        })
        .optional(),

    skillsRequired: z.array(z.string()),

    requiredCount: z.number(),

    deadline: z.string(),
})

router.post("/create",authenticate,async (req,res)=>{
    try{
        const result = needSchema.safeParse(req.body);
        if(!result.success){
            return res.status(400).json({
                message:"Invalid inputs"
            })
        }
        const data = result.data;

        const need = new Need({
            ...data,
            organisation:req.User.id,
            deadline:data.deadline
        });

        await need.save();

        res.status(201).json({
            message:"Need created successfully"
        });
    }catch(err){
        res.status(500).json({
            message:"Server error"
        })
    }
}); 


router.post("/needs/:needId/applicant/:userId",authenticate,async(req,res)=>{
    try{
        const orgId = req.user.id;
        const { needId,userId } = req.params;
        const { status }=req.body;

        const needs = await Need.findById(needId);

        if(!needs){
            return res.status(400).json({
                message:"Need does'nt exist"
            })
        }

        if(needs.organisation.toString() != orgId){
            return res.status(400).json({
                message:"Need doesn't belongs to this organistaion"
            })
        }

        const applicant = needs.applicants.find(
            (app)=>app.user.toString()===userId
        )

        if(!apllicant){
            return res.status(400).json({
                message:"User has not applied"
            })
        }

        applicant.status = status;
        await needs.save();

        if(status = "accepted"){
            await User.findByIdAndUpdate(userId,{
                $addToSet:{completedNeeds:needId}
            });
        }

        return res.status(200).json({
            message:"Applicant Successfully reviewd"
        })
    }catch(err){
        return res.status(500).json({
            message:"Error occured"
        })
    }
})


module.exports= router;

