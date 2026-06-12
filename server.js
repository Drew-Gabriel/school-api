const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const { initDb } = require("./db/connect");

const app = express();

app.use(cors());
app.use(express.json());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.get("/", (req, res) => {
  res.send("School API Running");
});

app.use("/auth", require("./routes/auth"));
app.use("/students", require("./routes/students"));
app.use("/courses", require("./routes/courses"));
app.use("/instructors", require("./routes/instructors"));
app.use("/enrollments", require("./routes/enrollments"));

const PORT = process.env.PORT || 3000;

// Only start server if NOT testing
if (process.env.NODE_ENV !== "test") {
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
}

module.exports = app;