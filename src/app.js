import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json' assert{type:'json'};

import {createRoles} from './libs/initialSetup.js';

import registerRoutes from './routes/registers.routes.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();
createRoles();

app.set('pkg',pkg);

const allowedOrigins = ['https://luksofqa.netlify.app/','https://luksofqa.netlify.app/pages/form.register.html', 'https://api-rest-full-ork3.onrender.com'];

/*
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });
  */

app.all('*',function (req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
})

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        author: app.get('pkg').author,
        version: app.get('pkg').version,
        description: app.get('pkg').description
    });
});

app.use('/api/registers',registerRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);

export default app;
