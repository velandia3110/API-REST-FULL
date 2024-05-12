import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json';

import {createRoles} from './libs/initialSetup';

import registerRoutes from './routes/registers.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

const app = express();
createRoles();

app.set('pkg',pkg);


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
