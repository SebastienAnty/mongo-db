import { MongoClient } from "mongodb";
import dotenv from "dotenv"

dotenv.config()

let _client = new MongoClient(process.env.MONGO_URL);
let isConnected = false 

// only evre create 1 client, if it already exists just return it;
export const createClient = async (req, res) => {
  if (!isConnected) {
    await _client.connect();
    isConnected = true
  }
  return _client;
};
