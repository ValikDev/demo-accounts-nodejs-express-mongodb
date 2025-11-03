import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';

export function validateAccountIdParam(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid id parameter' });
  }

  return next();
}