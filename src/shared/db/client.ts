import { Account } from '@modules/accounts/models/account.model';

/**
 * A small in-memory client used for temporary testing purposes.
 * @todo Replace with a real DB client as needed.
 */
export const db = {
  accounts: new Map<string, Account>()
};
