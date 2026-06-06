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

// PUBLIC ROUTE
app.get("/", (req, res) => {
  res.send("School API Running");
});

// AUTH ROUTES (public)
app.use("/auth", require("./routes/auth"));

// IMPORTANT: TEMPORARILY UNPROTECTED (to avoid crash)
// After deploy works, we re-enable middleware
app.use("/students", require("./routes/students"));
app.use("/courses", require("./routes/courses"));

const PORT = process.env.PORT || 3000;

// START SERVER AFTER DB CONNECT
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