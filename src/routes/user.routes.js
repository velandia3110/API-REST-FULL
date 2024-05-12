
import { Router } from "express";
const router = Router();

import * as userController from '../controllers/user.controller';
import {authjwt,verifySignup} from '../middlewares';

router.post('/users',[authjwt.verifyToken,authjwt.isAdmin,verifySignup.checkRolesExisted],userController.createUser);

export default router;