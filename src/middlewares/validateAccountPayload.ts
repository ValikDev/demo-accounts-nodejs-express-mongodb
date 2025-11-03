import { NextFunction, Request, Response } from 'express';
import { AccountPayloadSchema } from '../types';
import { z } from 'zod';

export function validateAccountPayload(req: Request, res: Response, next: NextFunction) {
  // Strict validation against AccountPayloadSchema to report extra/unexpected keys by Zod
  // (i.e. an attempt to overwrite id/createdAt/updatedAt fields)
  const parsed = AccountPayloadSchema.strict().safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: z.prettifyError(parsed.error) });
  }

  // Replace body with the parsed (and typed) data
  // to ensure downstream handlers receive only validated fields
  req.body = parsed.data;

  return next();
}
