import { z } from 'zod';

export const BaseModelSchema = z.object({
  id: z.uuid().optional(),
  createdAt: z.date(),
  updatedAt: z.date().optional()
});
