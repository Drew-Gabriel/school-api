const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getDb } = require("../db/connect");

// REGISTER
const register = async (req, res) => {
  try {
    const db = getDb();

    const existingUser = await db.collection("users").findOne({
      email: req.body.email
    });

    if (existingUser) {
      return res.status(400).json("User already exists");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await db.collection("users").insertOne({
      email: req.body.email,
      password: hashedPassword
    });

    res.status(201).json("User created successfully");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const db = getDb();

    const user = await db.collection("users").findOne({
      email: req.body.email
    });

    if (!user) {
      return res.status(400).json("Invalid email or password");
    }

    const isValid = await bcrypt.compare(req.body.password, user.password);

    if (!isValid) {
      return res.status(400).json("Invalid email or password");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      "secretkey",
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = { register, login };