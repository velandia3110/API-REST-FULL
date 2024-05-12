import {ROLES} from '../models/Role.js';
import User from '../models/User.js';

export const checkDuplicatedUsernameOrEmail = async (req, res, next) => {
    const user = await User.findOne({username:req.body.username});
    if(user) return res.status(400).json({message: 'Duplicated username, email or phone number'});
    const email =  await User.findOne({email:req.body.email});
    if(email) return res.status(400).json({message: 'Duplicated username, email or phone number'});
    const phone =  await User.findOne({phone:req.body.phone});
    if(phone) return res.status(400).json({message: 'Duplicated username, email or phone number'});

    next();
}

export const checkRolesExisted = (req,res,next) => {
    if(req.body.role){
        for(let i = 0; i < req.body.role.length; i++){
            if(!ROLES.includes(req.body.role[i])){
                return res.status(400).json({
                    message: `Role ${req.body.role[i]} no es válido`
                });
            }
        }
    }
    next();
};