db = db.getSiblingDB('demo_db');

// Initialize accounts collection with schema validation
db.createCollection('accounts', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'scope', 'createdAt'],
      properties: {
        _id: { bsonType: 'objectId' },
        name: {
          bsonType: 'string',
          minLength: 1
        },
        scope: {
          enum: ['account', 'prospect', 'child']
        },
        createdAt: { bsonType: 'date' },
        updatedAt: { bsonType: 'date' }
      }
    }
  },
  validationAction: 'error'
});

// Create indexes, as we don't have any other queries i.e. on name, created/updated timestamps
// we define only index on scope for now
db.accounts.createIndex(
  { scope: 1 },
  { name: 'idx_scope' }
);
