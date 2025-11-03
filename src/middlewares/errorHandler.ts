import { NextFunction, Request, Response } from 'express';

import { logger } from '../utils/logger';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  logger.error(err);

  const isErrorObject = err && typeof err === 'object';

  const status = (isErrorObject && 'status' in err && Number.isInteger(err.status))
    ? Number(err.status)
    : 500;
  const message = (isErrorObject && 'message' in err)
    ? err.message
    : 'Internal Server Error';

  res.status(status).json({ error: message });
}
