
import { Router } from "express";
const router = Router();

import * as userController from '../controllers/user.controller.js';
import {authjwt,verifySignup} from '../middlewares/index.js';

router.post('/users',[authjwt.verifyToken,authjwt.isAdmin,verifySignup.checkRolesExisted],userController.createUser);

export default router;