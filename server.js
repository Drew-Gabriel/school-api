const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const { initDb } = require("./db/connect");

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Home Route
app.get("/", (req, res) => {
  res.send("School API Running");
});

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/students", require("./routes/students"));
app.use("/courses", require("./routes/courses"));
app.use("/instructors", require("./routes/instructors"));
app.use("/enrollments", require("./routes/enrollments"));

const PORT = process.env.PORT || 3000;

// IMPORTANT: DO NOT BLOCK SERVER START IF DB FAILS
if (process.env.NODE_ENV !== "test") {
  initDb()
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.log("MongoDB Error (non-blocking):", err.message);
    })
    .finally(() => {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    });
}

module.exports = app;