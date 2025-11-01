import { env } from 'config/env';
import { createAccount, getAccountStatistics, updateAccount } from 'controllers';
import express, { Router } from 'express';
import { errorHandler, validateAccountIdParam, validateAccountPayload } from 'middlewares';
import { logger } from 'utils/logger';

export const app = express();

app.use(express.json());

const accountsRouter = Router();
accountsRouter.post('/', validateAccountPayload, createAccount);
accountsRouter.put('/:id', validateAccountIdParam, validateAccountPayload, updateAccount);
accountsRouter.get('/stat', getAccountStatistics);

app.use('/accounts', accountsRouter);

app.use(errorHandler);

const port = env.PORT;

app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});
