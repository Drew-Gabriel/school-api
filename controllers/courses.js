const { getDb } = require("../db/connect");
const { ObjectId } = require("mongodb");

const getAll = async (req, res) => {
  const db = getDb();
  res.json(await db.collection("courses").find().toArray());
};

const getSingle = async (req, res) => {
  const db = getDb();
  const data = await db.collection("courses").findOne({
    _id: new ObjectId(req.params.id)
  });
  res.json(data);
};

const createCourse = async (req, res) => {
  const db = getDb();
  const result = await db.collection("courses").insertOne(req.body);
  res.status(201).json(result);
};

const updateCourse = async (req, res) => {
  const db = getDb();
  const result = await db.collection("courses").updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.json(result);
};

const deleteCourse = async (req, res) => {
  const db = getDb();
  const result = await db.collection("courses").deleteOne({
    _id: new ObjectId(req.params.id)
  });
  res.json(result);
};

module.exports = {
  getAll,
  getSingle,
  createCourse,
  updateCourse,
  deleteCourse
};