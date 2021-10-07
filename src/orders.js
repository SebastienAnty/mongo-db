import { createClient } from "./client.js"

const getOrdersCollection = async () => {
    const dealer = await createClient();
    const db = dealer.db("dealership");
    return db.collection("orders");
  };

  export const getOrders = async () => {
    const col = await getOrdersCollection();
    const orders = col.find();
    return orders.toArray()
  };

  export const getOrderById = async () => {
    const ordersCollection = await getOrdersCollection
    const ret = await ordersCollection.find(id)
    return ret
  };

  export const createOrders = async ({ date, carID, buyerID }) => {
    const carsCollection = await getOrdersCollection();
    const ret = await carsCollection.insertOne({ date, carID, buyerID });
    return ret.insertedId
  };