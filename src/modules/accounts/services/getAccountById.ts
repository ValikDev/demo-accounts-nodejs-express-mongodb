
import { Account } from '../models/account.model';
import { accountRepo } from '../repositories/accountRepo';

export async function getAccountById(id: string): Promise<Account | null> {
  return accountRepo.getById(id);
}
