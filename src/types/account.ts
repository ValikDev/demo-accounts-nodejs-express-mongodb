import { z } from 'zod';

import { AccountPayloadSchema, AccountSchema } from './account.schema';

export type Account = z.infer<typeof AccountSchema>;

export type AccountPayload = z.infer<typeof AccountPayloadSchema>;
