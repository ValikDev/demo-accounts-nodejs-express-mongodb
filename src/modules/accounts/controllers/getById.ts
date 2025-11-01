import { NextFunction,Request, Response } from 'express';

import { getAccountById } from '../services/getAccountById';

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;
    const item = await getAccountById(id);
    if (!item) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.json(item);
  } catch (err) {
    next(err);
  }
}
