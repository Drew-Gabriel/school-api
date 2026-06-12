const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

let database;
let client;

const initDb = async () => {
  if (database) return database;

  client = await MongoClient.connect(process.env.MONGODB_URI);

  database = client.db();

  console.log("Connected to MongoDB");

  return database;
};

const getDb = () => {
  if (!database) {
    throw new Error("Database not initialized");
  }
  return database;
};

// ✅ TEST FIX: mock DB when testing
if (process.env.NODE_ENV === "test") {
  database = {
    collection: () => ({
      find: () => ({
        toArray: async () => []
      }),
      findOne: async () => null,
      insertOne: async () => ({ acknowledged: true }),
      updateOne: async () => ({ modifiedCount: 1 }),
      deleteOne: async () => ({ deletedCount: 1 })
    })
  };
}

module.exports = {
  initDb,
  getDb
};