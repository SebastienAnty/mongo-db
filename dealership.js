import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import faker from "faker";

dotenv.config();
let _client = new MongoClient(process.env.MONGO_URL);

// only evre create 1 client, if it already exists just return it;
const createClient = async () => {
  if (!_client) {
    _client = new MongoClient(process.env.MONGO_URL);
    await _client.connect();
  }
  return _client;
};

const getCarsCollection = async () => {
  const dealer = await createClient();
  const db = dealer.db("dealership");
  return db.collection("cars");
};

const getCars = async () => {
  const col = await getCarsCollection()
  col.find().toArray
}

const getBuyersCollection = async () => {
  const dealer = await createClient();
  const db = dealer.db("dealership");
  return db.collection("cars");
};

const getOrdersCollection = async () => {
  const dealer = await createClient();
  const db = dealer.db("dealership");
  return db.collection("orders");
};

const createCars = async ({ make, model, price }) => {
  const carsCollection = await getCarsCollection();
  await carsCollection.insertOne({ make, model, price });
  return {make, model, price}
};

const createBuyers = async ({ name, address, phone }) => {
  const buyersCollection = await getBuyersCollection();
  await buyersCollection.insertOne({ name, address, phone });
  return {name, address, phone}
};

const createOrders = async ({ date, carID, buyerID }) => {
  const carsCollection = await getOrdersCollection();
  await carsCollection.insertOne({ date, carID, buyerID });
  return { date, carID, buyerID };
};

const readOrder = async () => {
    const userCollection = await getCarsCollection(); 
    const ret = await userCollection.findOne({"id": ObjectId("615603a34f617c6ae41f559f")});
    return ret;
}

const run = async () => {
  const client = await createClient();
  const orders = await readOrder();
  console.log(orders)
  const newCar = await createCars({
    make: faker.vehicle.model(),
    model: faker.vehicle.type(),
    price: faker.datatype.number(),
  }).then()
  const newBuyer = await createBuyers({
    name: `${faker.name.firstName()} ${faker.name.lastName}`,
    address: faker.address.streetAddress(),
    phone: faker.phone.phoneNumber(),
  });
  const newOrder = 
  
  await createOrders({
    date: faker.date.month(),
    carID: newCar._id,
    buyerID: newBuyer._id
  });
  await client.close();
};

run().then();


// new ObjectId("615603a34f617c6ae41f559f") carID
// new ObjectId("615603a34f617c6ae41f55a0") buyerID
// console.log(createdACar.insertedId)
//   console.log(createdABuyer.insertedId)

// "carID" : "615603a34f617c6ae41f559f", "buyerID" : "615603a34f617c6ae41f55a0" }  This is was what was returned from mongo

