import { Router } from 'express';

import { create, getById, update } from '../controllers';
import validateAccountPayload from '../middlewares/validateAccountPayload';

const router = Router();

router.post('/', validateAccountPayload, create);
router.put('/:id', validateAccountPayload, update);
router.get('/:id', getById);

export default router;
