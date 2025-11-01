import { Collection } from 'mongodb';
import { Account } from './account';

export interface Collections {
  accounts: Collection<Account>;
}
