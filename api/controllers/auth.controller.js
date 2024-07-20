import User from "../models/user.model.js";
import bcyrptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
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

export const signin = async (req, res, next) => {
    const {email, password} = req.body;
    try{
        // check if email exists
        const validUser = await User.findOne({email})
        if (!validUser){
            return next(errorHandler(404, 'User not found!'))
        }
        //check if password is correct -- remember the the passwd in db is hashed
        const validPasswd = bcyrptjs.compareSync(password, validUser.password);
        if (!validPasswd) return next(errorHandler(401, 'Wrong Password!'));
        
        //authenticate user with jwt
        const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET);
        const {password: pass, ...nonPassInfo} = validUser._doc;
        res.cookie('token', token, {httpOnly:true})
        .status(200)
        .json(nonPassInfo);

    }catch(error){
        next(error);
    }

}