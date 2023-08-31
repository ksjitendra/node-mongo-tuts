const { MongoClient } = require('mongodb');

async function performTransaction() {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const session = client.startSession();

    session.startTransaction();

    const collection1 = client.db('myDB').collection('collection1');
    const collection2 = client.db('myDB').collection('collection2');

    try {
      // Update document in collection1
      await collection1.updateOne(
        { _id: 1 },
        { $set: { field1: 'New value' } },
        { session }
      );

      // Insert document in collection2
      await collection2.insertOne(
        { _id: 1, field2: 'Value' },
        { session }
      );

      // Commit the transaction
      await session.commitTransaction();
      console.log('Transaction committed successfully.');
    } catch (error) {
      // Rollback the transaction if any operation fails
      await session.abortTransaction();
      console.log('Transaction aborted.');
      throw error;
    } finally {
      session.endSession();
    }
  } finally {
    client.close();
  }
}

performTransaction().catch(console.error);
