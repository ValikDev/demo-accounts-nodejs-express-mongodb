
import { Account, AccountPayload } from '../models/account.model';
import { accountRepo } from '../repositories/accountRepo';

export async function createAccount(payload: AccountPayload): Promise<Account> {
  return accountRepo.create(payload);
}
