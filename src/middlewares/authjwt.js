import jwt from "jsonwebtoken";
import config from "../config.js";
import User from '../models/User.js';
import Role from '../models/Role.js';

export const verifyToken = async(req,res,next) => {
    const token = req.headers["x-access-token"];

    if(!token) return res.status(403).json({message:"No token provided."});

    try {
        const decoded = jwt.verify(token,config.SECRET)
        req.userId = decoded.id;
        
        const user = await User.findById(req.userId,{password:0})
        console.log(user);
        if(!user) return res.status(404).json({message:'User not found.'});
        
        next();
    } catch (error) {
        return res.status(500).json({message:'Unauhorized'});
    }
};

export const isAdmin = async(req,res,next) => {
    try {
        const user = await User.findById(req.userId);
        const Rol = await Role.find({_id:{$in:user.role}});
        
        for(let i = 0; i < Rol.length; i++) {
            if(Rol[i].name === 'admin'){
                next();
            }
            return;
        }
        return res.status(403).json({message:'You are not admin.'});
    } catch (error) {
        return res.status(403).json({message:error.message});
    }
}