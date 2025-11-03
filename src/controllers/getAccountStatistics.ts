import { NextFunction, Request, Response } from 'express';

import { accountRepo } from '../repositories/accountRepo';

export async function getAccountStatistics(_req: Request, res: Response, next: NextFunction) {
  try {
    // For simplicity, we directly use the repository here,
    // but in a real-world scenario, we would use a service layer
    const stats = await accountRepo.getStatistics();

    res.json(stats);
  } catch (err) {
    next(err);
  }
}