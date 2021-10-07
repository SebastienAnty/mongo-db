import dotenv from "dotenv";
import express from "express";
import { createCars, getCarById, getCars } from "./src/cars.js"
import { createBuyers, getBuyerById, getBuyers } from "./src/buyers.js"
import { createOrders, getOrderById, getOrders } from "./src/orders.js"
import { ObjectId } from "bson";
// import { createCars } from "./src/cars.js"
// import { createBuyers } from "./src/buyers.js"
// import { createOrders } from "./src/orders.js"

dotenv.config();

const app = express()
app.use(express.json())

app.get("/cars", async (req, res) => {
  try {
    let cars = await getCars(req.body)
    res.status(200).send(cars)
  } catch(err) {
    res.status(500).send(err)
    console.log(err)
  }
})

app.get("/buyers", async (req, res) => {
  try {
    let buyers = await getBuyers(req.body)
    res.status(200).send(buyers)
  } catch(err){
    res.status(500).send(err)
  }
})
app.get("/orders", async (req, res) => {
  try {
    let orders = await getOrders(req.body)
    res.status(200).send(orders)
  } catch(err){
    res.status(500).send(err)
  }
})

app.post("/cars", async (req, res) => {
  try {
    let cars = await createCars(req.body)
    res.status(201).send(cars)
  } catch(err){
    res.status(500).send(err)
    console.log(err)
  }
})

app.post("/buyers", async (req, res) => {
  try {
    let buyers = await createBuyers(req.body)
    res.status(201).send(buyers)
  } catch(err) {
    res.status(500).send(err)
    console.log(err)
  }
})

app.post("/orders", async (req, res) => {
  try {
    let orders = await createOrders(req.body)
    res.status(201).send(orders)
  } catch {
    res.status(500).send(err)
  }
})

app.get("/cars/:id", async (req, res) => {
  try {
    const id = ObjectId (req.params.id);
    let cars = await getCarById(id);
    res.status(200).send(cars)
  } catch {
    res.status(500).send(err)
    console.log(err)
  }
})
app.get("/buyers/:id", async (req, res) => {
  try {
    const id = ObjectId (req.params.id);
    let buyers = await getBuyerById(id);
    res.status(200).send(buyers)
  } catch {
    res.status(500).send(err)
    console.log(err)
  }
})
app.get("/orders/:id", async (req, res) => {
  try {
    const id = ObjectId (req.params.id);
    let orders = await getOrderById(id);
    res.status(200).send(orders)
  } catch {
    res.status(500).send(err)
    console.log(err)
  }
})

app.listen(3000, () => console.log("listening on port 3000"))

// exports.app = functions.https.onRequest(app)