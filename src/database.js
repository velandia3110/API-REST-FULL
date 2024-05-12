import mongoose from "mongoose";

mongoose.connect('mongodb+srv://velandini:hrgsKjgAS6Umvc0a@luksoft.xsdolby.mongodb.net/?retryWrites=true&w=majority&appName=LukSoft')
.then(db => console.log('DB is connected'))
.catch(err => console.log('DB is not connected: '+err));