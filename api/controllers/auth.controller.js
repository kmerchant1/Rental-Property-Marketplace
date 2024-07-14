import User from "../models/user.model.js";
import bcyrptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
export const signup = async (req, res, next) => {
    const {username, password, email} = req.body;
    const hash = bcyrptjs.hashSync(password, 10);
    const newUser = new User({username, password:hash, email});
    try{
        await newUser.save();
        res.status(201).json("User created successfully");
    }catch (error){
        next(error);
    }
    
};