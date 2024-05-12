import { Router } from "express";
const router = Router();

import * as registerController from '../controllers/registers.controller';
import {authjwt} from '../middlewares';

router.get('/', registerController.getRegisters);
router.get('/:id', registerController.getRegisterById);

router.post('/',authjwt.verifyToken, registerController.createRegister);
router.put('/:id',authjwt.verifyToken, registerController.updateRegisterById);
router.delete('/:id',authjwt.verifyToken, registerController.deleteRegisterById);



export default router;