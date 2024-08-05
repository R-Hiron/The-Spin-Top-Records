const { MongoClient } = require("mongodb");
require('dotenv').config(); // Load environment variables

const url = process.env.MONGODB_URI;

if (!url) {
  console.error("MONGODB_URI environment variable is not set");
  process.exit(1);
}

console.log("MongoDB URI:", url);

let client;

async function connect() {
  try {
    if (!client) {
      client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
      console.log('Connected to MongoDB');
    }
    return client.db(); // Return the connected database
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw error; // Ensure we throw the error to handle it in calling functions
  }
}

module.exports = {
  connect,
};
