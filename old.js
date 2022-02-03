import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
let _client;

const createClient = async () => {
  if (!_client) {
    _client = new MongoClient(process.env.MONGO_URL);
    await _client.connect();
  }
  return _client;
};

const getUserCollection = async () => {
  const client = await createClient();
  const db = client.db("db2");
  return db.collection("user");
};

const createUser = async ({ name, dob, email }) => {
  const userCollection = await getUserCollection();
  await userCollection.insertOne({ name, dob, email });
  return { name, dob, email };
};

const run = async () => {
  const client = await createClient();
  await createUser({
    name: "Sebas",
    dob: new Date("02/10/2000"),
    email: "sebas@gmail.com",
  });
  await client.close();
};

run().then();
