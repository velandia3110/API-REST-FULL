import {Schema, model} from 'mongoose';

const registerSchema = new Schema({
    description:String,
    category:String,
},{
    timestamps:true,
    versionKey:false
});

export default model('Register',registerSchema);