import { AccountPayloadSchema } from '@modules/accounts/models/account.model';
import { updateAccount } from '@modules/accounts/services/updateAccount';
import { NextFunction,Request, Response } from 'express';
import z from 'zod';

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = AccountPayloadSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: z.prettifyError(parsed.error) });
    }
    const id = req.params.id as string;

    const patched = await updateAccount(id, parsed.data);
    if (!patched) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.json(patched);
  } catch (err) {
    next(err);
  }
}
