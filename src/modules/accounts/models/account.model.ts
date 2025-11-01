import { BaseModelSchema } from '@shared/models/base';
import { z } from 'zod';

export const AccountSchema = BaseModelSchema.extend({
  name: z.string().min(1),
  scope: z.enum(['account', 'prospect', 'child']),
});
export type Account = z.infer<typeof AccountSchema>;

export const AccountPayloadSchema = AccountSchema.pick({ name: true, scope: true });
export type AccountPayload = z.infer<typeof AccountPayloadSchema>;
