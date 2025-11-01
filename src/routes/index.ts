import accountsRouter from '@modules/accounts/routes/account.route';
import { Router } from 'express';

const router = Router();

router.use('/accounts', accountsRouter);

export default router;
