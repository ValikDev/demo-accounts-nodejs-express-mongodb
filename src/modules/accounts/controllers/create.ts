import { AccountPayloadSchema } from '@modules/accounts/models/account.model';
import { createAccount } from '@modules/accounts/services/createAccount';
import { NextFunction,Request, Response } from 'express';
import z from 'zod';

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = AccountPayloadSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: z.prettifyError(parsed.error) });
    }

    const account = await createAccount(parsed.data);
    res.status(201).json(account);
  } catch (err) {
    next(err);
  }
}
