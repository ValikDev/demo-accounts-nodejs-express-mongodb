
import { Account, AccountPayload } from '../models/account.model';
import { accountRepo } from '../repositories/accountRepo';

export async function updateAccount(id: string, payload: AccountPayload): Promise<Account | null> {
  return accountRepo.update(id, payload);
}
