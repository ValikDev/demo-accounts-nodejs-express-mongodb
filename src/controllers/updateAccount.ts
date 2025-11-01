import { NextFunction,Request, Response } from 'express';
import { accountRepo } from 'repositories/accountRepo';

export async function updateAccount(req: Request, res: Response, next: NextFunction) {
  try {
    // ID and payload both already validated by middlewares
    const { params: { id }, body: payload } = req;

    // For simplicity, we directly use the repository here,
    // but in a real-world scenario, we would use a service layer
    const updatedAccount = await accountRepo.update(id, payload);

    if (!updatedAccount) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.json(updatedAccount);
  } catch (err) {
    next(err);
  }
}
