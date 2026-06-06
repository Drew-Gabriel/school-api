const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const { initDb } = require("./db/connect");

// 🔐 ADD AUTH MIDDLEWARE
const verifyToken = require("./middleware/auth");

const app = express();

app.use(cors());
app.use(express.json());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* ---------------------------
   PUBLIC ROUTES
----------------------------*/
app.get("/", (req, res) => {
  res.send("School API Running");
});

// AUTH ROUTES (public)
app.use("/auth", require("./routes/auth"));

/* ---------------------------
   PROTECTED ROUTES 🔐
----------------------------*/

// Students (protected)
app.use("/students", verifyToken, require("./routes/students"));

// Courses (protected)
app.use("/courses", verifyToken, require("./routes/courses"));

const PORT = process.env.PORT || 3000;

/* ---------------------------
   START SERVER AFTER DB
----------------------------*/
initDb()
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });