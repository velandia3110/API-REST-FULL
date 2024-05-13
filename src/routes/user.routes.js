
import { Router } from "express";
import bodyParser from 'body-parser';
const router = Router();

import * as userController from '../controllers/user.controller.js';
import {authjwt,verifySignup} from '../middlewares/index.js';

const jsonParser = bodyParser.json();

router.post('/users',jsonParser,[authjwt.verifyToken,authjwt.isAdmin,verifySignup.checkRolesExisted],userController.createUser);

export default router;