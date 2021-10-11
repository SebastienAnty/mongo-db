import { createClient } from "./client.js"

const getCarsCollection = async () => {
    const dealer = await createClient();
    const db = dealer.db("dealership");
    return db.collection("cars");
  };

  export const getCars = async () => {
    const col = await getCarsCollection();
    const cars = col.find();
    return cars.toArray()
  };

  export const getCarById = async () => {
    const carsCollection = await getCarsCollection
    const ret = await carsCollection.find(id)
    return ret
  }; 

  export const createCars = async ({ make, model, price }) => {
    const carsCollection = await getCarsCollection();
    const ret = await carsCollection.insertOne({ make, model, price });
    return ret
  };

  export const updateCar = async (id, { make, model, price }) => {
    const carsCollection = await getCarsCollection();
    const ret = await carsCollection.updateOne( {_id:id} ,{ make, model, price } )
    return ret
  };

  export const deleteCars = async (id) => {
    const carsCollection = await getCarsCollection();
    const ret = await carsCollection.deleteOne({id})
    return ret
}