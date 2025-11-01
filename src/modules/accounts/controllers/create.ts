import { createAccount } from '@modules/accounts/services/createAccount';
import { NextFunction,Request, Response } from 'express';

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { body: payload } = req;

    const createdAccount = await createAccount(payload);

    res.status(201).json(createdAccount);
  } catch (err) {
    next(err);
  }
}
