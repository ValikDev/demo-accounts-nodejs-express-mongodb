import { NextFunction, Request, Response } from 'express';

import { logger } from '../utils/logger';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  logger.error(err);
  const status = (err && typeof err === 'object' && 'status' in err && Number.isInteger(err.status)) ? Number(err.status) : 500;
  const message = (err && typeof err === 'object' && 'message' in err) ? err.message : 'Internal Server Error';
  res.status(status).json({ error: message });
}
