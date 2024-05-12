import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Role';


 //Para registrar nuevos empleados
    export const signup = async (req, res) => {
    try {
        const {username,email,phone,password,departament,role} = req.body;

        const newEmployee = new User({
            username,
            email,
            phone,
            departament,
            password: await User.encryptPassword(password)
        });

        if (role) {
            const foundRole = await Role.find({name:{$in:role}});
            newEmployee.role = foundRole.map(role => role._id);
        } else {
            const rol = await Role.findOne({name:"user"});
            newEmployee.role = [rol._id];
        }

        const saveUser = await newEmployee.save();
        const token = jwt.sign({id:saveUser._id},config.SECRET,{
            expiresIn:3600 //una hora
        });

    res.status(200).json({token});
    } catch (error) {
        res.status(500).json({message:'Data duplicated error'});
    }
}


export const signin = async (req, res) => {
    const userFound = await User.findOne({email:req.body.email}).populate("role");

    if(!userFound) return res.status(404).json({message:"User not found"});

    const matchPassword = await User.comparePassword(req.body.password,userFound.password);

    if(!matchPassword) return res.status(401).json({message:"Password incorrect"});

    const token = jwt.sign({id:userFound._id}, config.SECRET,{
        expiresIn:3600 //una hora
    });

    res.json({token});

}