import { createClient } from "./client.js"

const getBuyersCollection = async () => {
    const dealer = await createClient();
    const db = dealer.db("dealership");
    return db.collection("buyers");
  };

  export const getBuyers = async () => {
    const col = await getBuyersCollection();
    const buyers = await col.find();
    return buyers.toArray()
  };

 export const getBuyerById = async () => {
      const buyersCollection = await getBuyersCollection
      const ret = await buyersCollection.find(id)
      return ret
  };

  export const createBuyers = async ({ name, address, phone }) => {
    const buyersCollection = await getBuyersCollection();
    const ret = await buyersCollection.insertOne({ name, address, phone });
    return ret.insertedId
  };

 