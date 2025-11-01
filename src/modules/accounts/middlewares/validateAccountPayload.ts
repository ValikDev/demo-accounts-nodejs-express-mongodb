import { AccountPayloadSchema } from '@modules/accounts/models/account.model';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export default function validateAccountPayload(req: Request, res: Response, next: NextFunction) {
  // Strict validation against AccountPayloadSchema to report extra/unexpected keys by Zod
  // (i.e. an attempt to overwrite id/createdAt/updatedAt fields) 
  const parsed = AccountPayloadSchema.strict().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ errors: z.prettifyError(parsed.error) });
  }

  // Replace body with the parsed (and typed) data
  // to ensure downstream handlers receive only validated fields.
  req.body = parsed.data;
  return next();
}
