import {Schema, model} from 'mongoose'
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    username:{
        type: String,
        unique: true
    },
    email:{
        type: String,
        unique: true
    },
    phone:{
        type: String,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    departament:{
        type: String,
    },
    role:[{
        ref:'Role',
        type: Schema.Types.ObjectId
    }]  
},
    {
        versionKey: false,
        timestamps: true
    }
);

userSchema.statics.encryptPassword = async(password)=>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
}

userSchema.statics.comparePassword = async(password,receivedPassword)=>{
    return await bcrypt.compare(password,receivedPassword);
}



export default model('User', userSchema);