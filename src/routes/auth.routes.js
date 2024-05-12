import { Router } from "express";
const router = Router();

import * as authController from '../controllers/auth.controller.js';
import {authjwt,verifySignup} from '../middlewares';

router.post('/signin',authController.signin);
router.post('/signup/',[authjwt.verifyToken,authjwt.isAdmin,verifySignup.checkRolesExisted,verifySignup.checkDuplicatedUsernameOrEmail],authController.signup);

export default router;