import { Router } from "express";
import bodyParser from 'body-parser';
const router = Router();

import * as authController from '../controllers/auth.controller.js';
import {authjwt,verifySignup} from '../middlewares/index.js';

const jsonParser = bodyParser.json();

router.post('/signin',jsonParser,authController.signin);
router.post('/signup/',jsonParser,[authjwt.verifyToken,authjwt.isAdmin,verifySignup.checkRolesExisted,verifySignup.checkDuplicatedUsernameOrEmail],authController.signup);

export default router;