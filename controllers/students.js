const { getDb } = require("../db/connect");
const { ObjectId } = require("mongodb");

const getAll = async (req, res) => {
  const db = getDb();
  res.json(await db.collection("students").find().toArray());
};

const getSingle = async (req, res) => {
  const db = getDb();
  const data = await db.collection("students").findOne({
    _id: new ObjectId(req.params.id)
  });
  res.json(data);
};

const createStudent = async (req, res) => {
  const db = getDb();
  const result = await db.collection("students").insertOne(req.body);
  res.status(201).json(result);
};

const updateStudent = async (req, res) => {
  const db = getDb();
  const result = await db.collection("students").updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.json(result);
};

const deleteStudent = async (req, res) => {
  const db = getDb();
  const result = await db.collection("students").deleteOne({
    _id: new ObjectId(req.params.id)
  });
  res.json(result);
};

module.exports = {
  getAll,
  getSingle,
  createStudent,
  updateStudent,
  deleteStudent
};