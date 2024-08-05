const { ObjectId } = require("mongodb");
const dal = require("./m.db");

async function getLogins() {
  try {
    console.log("Connecting to database...");
    const db = await dal.connect();
    console.log("Connected to database");

    console.log("Fetching logins...");
    const cursor = db.collection("logins").find();
    const results = await cursor.toArray();

    console.log("Logins fetched:", results);
    return results;
  } catch (error) {
    console.error("Error in getLogins:", error);
    throw error;
  }
}

async function getLoginByUsername(name) {
  try {
    console.log("Connecting to database...");
    const db = await dal.connect();
    console.log("Connected to database");

    console.log("Fetching login by username...");
    const result = await db.collection("logins").findOne({ username: name });
    console.log("Login fetched:", result);
    return result;
  } catch (error) {
    console.error("Error in getLoginByUsername:", error);
    throw error;
  }
}

async function getLoginByEmail(email) {
  try {
    console.log("Connecting to database...");
    const db = await dal.connect();
    console.log("Connected to database");

    console.log("Fetching login by email...");
    const result = await db.collection("logins").findOne({ email: email });
    console.log("Login fetched:", result);
    return result;
  } catch (error) {
    console.error("Error in getLoginByEmail:", error);
    throw error;
  }
}

async function getLoginById(id) {
  try {
    console.log("Connecting to database...");
    const db = await dal.connect();
    console.log("Connected to database");

    console.log("Fetching login by ID...");
    const result = await db.collection("logins").findOne({ _id: new ObjectId(id) });
    console.log("Login fetched:", result);
    return result;
  } catch (error) {
    console.error("Error in getLoginById:", error);
    throw error;
  }
}

async function addLogin(name, email, password, uuidv4) {
  let newLogin = {
    username: name,
    email: email,
    password: password,
    uuid: uuidv4,
    last_updated: new Date(),
  };

  try {
    console.log("Connecting to database...");
    const db = await dal.connect();
    console.log("Connected to database");

    console.log("Adding new login...");
    const result = await db.collection("logins").insertOne(newLogin);
    console.log("New login added:", result.insertedId);
    return result.insertedId;
  } catch (error) {
    if (error.code === 11000) {
      console.error("Duplicate key error:", error);
      return error;
    }
    console.error("Error in addLogin:", error);
    throw error;
  }
}

module.exports = {
  getLogins,
  getLoginByUsername,
  addLogin,
  getLoginByEmail,
  getLoginById,
};
