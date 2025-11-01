import { NextFunction,Request, Response } from 'express';
import { accountRepo } from 'repositories/accountRepo';

export async function createAccount(req: Request, res: Response, next: NextFunction) {
  try {
    // Payload is already validated by the middleware
    const { body: payload } = req;

    // For simplicity, we directly use the repository here,
    // but in a real-world scenario, we would use a service layer
    const createdAccount = await accountRepo.create(payload);

    res.status(201).json(createdAccount);
  } catch (err) {
    next(err);
  }
}
