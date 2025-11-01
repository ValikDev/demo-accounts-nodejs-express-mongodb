import { Router } from 'express';

import { create, getById,update } from '../controllers';

const router = Router();

router.post('/', create);
router.put('/:id', update);
router.get('/:id', getById);

export default router;
