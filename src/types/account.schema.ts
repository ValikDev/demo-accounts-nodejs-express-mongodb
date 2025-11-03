import { z } from 'zod';

import { AccountScopes } from './account.enum';
import { BaseModelSchema } from './base.schema';

export const AccountSchema = BaseModelSchema.extend({
  name: z.string().min(1),
  scope: z.enum(AccountScopes),
});

export const AccountPayloadSchema = AccountSchema.pick({
  name: true,
  scope: true
});
