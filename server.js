const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const { initDb } = require("./db/connect");

const app = express();

app.use(express.json());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/students", require("./routes/students"));
app.use("/courses", require("./routes/courses"));

app.get("/", (req, res) => {
  res.send("School API Running");
});

const PORT = process.env.PORT || 3000;

// ✅ START SERVER FIRST (CRITICAL)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ✅ THEN CONNECT DB (NON-BLOCKING)
initDb()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB Error:", err));