const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { Need, User } = require("../db");
const router = express.Router();
const { JWT_secret } = require("../config");
const { authenticate } = require("./../Middlewares");
const mongoose = require("mongoose");

const signupBody = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(6),
    phone: zod.string(),
    bio: zod.string().optional(),
    skills: zod.array(zod.string()).optional(),
});

router.post("/signup", async (req, res) => {
    try {
        const result = signupBody.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid credentials",
                errors: result.error.errors
            });
        }

        const data = result.data;

        const existingUser = await User.findOne({
            email: data.email
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const user = await User.create({
            name: data.name,
            email: data.email,
            password: data.password,
            phone: data.phone,
            bio: data.bio,
            skills: data.skills
        });

        const token = jwt.sign(
            { id: user._id, role: "user" },
            JWT_secret,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            message: "User registered successfully",
            token: token,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "There is some error"
        });
    }
});

const loginBody = zod.object({
    email: zod.string().email(),
    password: zod.string(),
});

router.post("/login", async (req, res) => {
    const { success } = loginBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "Enter valid details"
        });
    }

    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign(
            { id: user._id, role: "user" },
            JWT_secret,
            { expiresIn: "7d" }
        );
        return res.status(200).json({
            message: "Signin Successful",
            token: token
        });
    } else {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }
});

router.post("/apply/:needId", authenticate, async (req, res) => {
    try {
        const userId = req.userId;
        const { needId } = req.params;

        const need = await Need.findById(needId);
        if (!need) {
            return res.status(400).json({
                message: "Need does not exist"
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User does not exist"
            });
        }

        if (user.appliedNeeds.includes(needId)) {
            return res.status(400).json({
                message: "Already applied",
            });
        }

        need.applicants.push({
            user: userId,
            status: "pending"
        });

        await need.save();
        await User.findByIdAndUpdate(userId, {
            $push: { appliedNeeds: needId }
        });

        res.status(200).json({
            message: "Applied successfully"
        });
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            message: "Something went wrong"
        });
    }
});

router.get("/all", authenticate, async (req, res) => {
    try {
        const { search } = req.query;

        let query = {};
        if (search) {
            query = {
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { description: { $regex: search, $options: "i" } },
                    { skillsRequired: { $regex: search, $options: "i" } },
                ]
            };
        }

        const needs = await Need.find(query)
            .populate("organisation", "name")
            .sort({ createdAt: -1 });

        return res.status(200).json(needs);
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            message: "Cannot fetch needs"
        });
    }
});

module.exports = router;
