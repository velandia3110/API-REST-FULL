import Register from '../models/Register.js';

export const createRegister = async(req,res)=>{
    const {description, category} = req.body;
    const newRegister = new Register({
        description,
        category
    });
    const registerSave = await newRegister.save();
    res.status(201).json(registerSave);
}

export const getRegisters = async(req,res)=>{
    const registers = await Register.find();
    res.json(registers);
}

export const getRegisterById = async(req,res)=>{
    const register = await Register.findById(req.params.id)
    res.status(200).json(register);
}

export const updateRegisterById = async(req,res)=>{
    const updatedRegister = await Register.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    });
    res.status(200).json(updatedRegister);
}

export const deleteRegisterById = async(req,res)=>{
    await Register.findByIdAndDelete(req.params.id);
    res.status(204).json();
}