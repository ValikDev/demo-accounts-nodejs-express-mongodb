import { getCollection } from 'db/mongodb';
import { ObjectId } from 'mongodb';
import { Account, AccountPayload, AccountScopes } from 'types';

const ACCOUNTS_COLLECTION = 'accounts';

export interface AccountStatistics {
  accounts: number;
  prospects: number;
  children: number;
}

export const accountRepo = {
  create,
  update,
  getStatistics
};

async function create(payload: AccountPayload): Promise<Account> {
  const collection = await getCollection(ACCOUNTS_COLLECTION);

  const doc = {
    ...payload,
    _id: new ObjectId(),
    createdAt: new Date()
  };

  await collection.insertOne(doc);

  return doc;
}

async function update(id: string, payload: AccountPayload): Promise<Account | null> {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const collection = await getCollection(ACCOUNTS_COLLECTION);
  const update = {
    $set: {
      ...payload,
      updatedAt: new Date()
    }
  };

  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    update,
    { returnDocument: 'after' }
  );

  if (!result) {
    return null;
  }

  return result;
}

async function getStatistics(): Promise<AccountStatistics> {
  const collection = await getCollection(ACCOUNTS_COLLECTION);

  const stats = await collection.aggregate<AccountStatistics>([
    {
      $group: {
        _id: '$scope',
        count: { $sum: 1 }
      }
    },
    {
      $group: {
        _id: null,
        accounts: {
          $sum: {
            $cond: [{ $eq: ['$_id', AccountScopes.Account] }, '$count', 0]
          }
        },
        prospects: {
          $sum: {
            $cond: [{ $eq: ['$_id', AccountScopes.Prospect] }, '$count', 0]
          }
        },
        children: {
          $sum: {
            $cond: [{ $eq: ['$_id', AccountScopes.Child] }, '$count', 0]
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        accounts: 1,
        prospects: 1,
        children: 1
      }
    }
  ]).next();

  return stats ?? { accounts: 0, prospects: 0, children: 0 };
}
