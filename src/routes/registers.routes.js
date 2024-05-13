import { Router } from "express";
import bodyParser from 'body-parser';
const router = Router();

import * as registerController from '../controllers/registers.controller.js';
import {authjwt} from '../middlewares/index.js';

const jsonParser = bodyParser.json();

router.get('/',jsonParser, registerController.getRegisters);
router.get('/:id',jsonParser, registerController.getRegisterById);

router.post('/',jsonParser,authjwt.verifyToken, registerController.createRegister);
router.put('/:id',jsonParser,authjwt.verifyToken, registerController.updateRegisterById);
router.delete('/:id',jsonParser,authjwt.verifyToken, registerController.deleteRegisterById);



export default router;