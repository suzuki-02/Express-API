import mongoose from 'mongoose';
import { MongoMemoryReplSet } from 'mongodb-memory-server';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryReplSet.create({
    replSet: { count: 1 },
  });

  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    dbName: 'test',
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
