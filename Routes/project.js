import express, { json } from "express";
import db from "../DB/conn.js";
import { ObjectId } from "mongodb";
// Connecting Routers
const router = express.Router();
// Landing to Company DB
router.get("/", (req, res) => {
  res.send("Hello and Welcome new employee meet the staff.");
});
// Querying all employees data
router.get("/staff", async (req, res) => {
  try {
    const collection = await db.collection("project");
    const query = await collection.find({}).toArray();
    console.log(query);
    if (!query) res.send("Not Found").status(404);
    else res.send(query).status(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Querying employee data
router.get("/:id", async (req, res) => {
  const collection = await db.collection("project");
  const query = { id: Number(req.params.id) };
  const result = await collection.findOne(query);

  console.log(result);
  if (!result) res.send("Not Found").status(404);
  else res.send(result).status(200);
});
// Hiring a new employee
router.post("/", async (req, res) => {
  const collection = await db.collection("project");
  const newDocument = req.body;
  console.log(newDocument);
  const result = await collection.insertOne(newDocument);
  console.log(result);
  res.send(result).status(204);
});
// Updating employee information
router.patch("/:id", async (req, res) => {
  try {
    const collection = await db.collection("project");
    const id = { id: Number(req.params.id) };
    const query = await collection.findOne(id);
    console.log(query);
    const newDocument = req.body;
    console.log(newDocument);
    const result = await collection.findOneAndReplace(query, newDocument);
    console.log(result);
    if (!result) {
      return res.status(404).json({ message: "Employee not Found" });
    }
    const updatedQuery = await collection.findOne(id);
    console.log(updatedQuery);
    res.status(200).json({ updatedQuery });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Deleting a employee
router.delete("/:id", async (req, res) => {
  try {
    const collection = await db.collection("project");
    const id = { id: Number(req.params.id) };
    const query = await collection.findOne(id);
    const result = await collection.deleteOne(query);
    if (!result) {
      return res.status(404).json({ message: "Employee not in Database" });
    }

    res.status(200).json({ message: "Employee was deleted from Database" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
