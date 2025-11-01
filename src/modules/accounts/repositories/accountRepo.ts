import { db } from '@shared/db/client';
import { randomUUID } from 'crypto';

import { Account, AccountPayload } from '../models/account.model';

export const accountRepo = {
  getById: async (id: string): Promise<Account | null> => db.accounts.get(id) ?? null,

  create: async (payload: AccountPayload): Promise<Account> => {
    const id = randomUUID();
    const now = new Date();
    const account: Account = { id, ...payload, createdAt: now };
    db.accounts.set(id, account);

    return account;
  },

  update: async (id: string, payload: AccountPayload): Promise<Account | null> => {
    const existing = db.accounts.get(id);
    if (!existing) {
      return null;
    }

    const updated: Account = { ...existing, ...payload, updatedAt: new Date() };
    db.accounts.set(id, updated);

    return updated;
  },
};
