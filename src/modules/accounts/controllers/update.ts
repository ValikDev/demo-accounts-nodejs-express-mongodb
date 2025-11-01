import { updateAccount } from '@modules/accounts/services/updateAccount';
import { NextFunction,Request, Response } from 'express';

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { params: { id }, body: payload } = req;

    const updatedAccount = await updateAccount(id, payload);
    if (!updatedAccount) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.json(updatedAccount);
  } catch (err) {
    next(err);
  }
}
