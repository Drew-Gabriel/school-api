const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getDb } = require("../db/connect");

const register = async (req, res) => {
  const db = getDb();

  const hashed = await bcrypt.hash(req.body.password, 10);

  await db.collection("users").insertOne({
    email: req.body.email,
    password: hashed
  });

  res.status(201).json("User created");
};

const login = async (req, res) => {
  const db = getDb();

  const user = await db.collection("users").findOne({
    email: req.body.email
  });

  if (!user) return res.status(400).json("Invalid");

  const match = await bcrypt.compare(req.body.password, user.password);

  if (!match) return res.status(400).json("Invalid");

  const token = jwt.sign({ id: user._id }, "secretkey", {
    expiresIn: "1h"
  });

  res.json({ token });
};

module.exports = { register, login };