import express from 'express';
import User from '../models/users.js';


export const registerUser = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({message: "Please fill all fields"})
        }

        const userExists = await User.findOne({email});
        if (userExists) {
            return res.status(400).json({message: "User already exists"})
        }

        const user = await User.create({name, email, password});
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email
        })
    } catch (err) {
        res.status(500).json({message: "Server error"});
    }
};

export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({message: "Please fill all fields"});
        }
        const user = await User.findOne({email});

        if(!user || !(await user.matchPassword(password))) {
            return res.status(401).json({message: "Invalid credentials"});
        }
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email
        });
    } catch (err) {
        res.status(500).json({message: "Server error"});
    }
};