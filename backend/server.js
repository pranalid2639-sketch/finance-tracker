const express = require("express");

const cors = require("cors");

require("dotenv").config();

const app = express();

const expenseRoutes = require("./routes/expenseRoutes");

const authRoutes = require("./routes/authRoutes");

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {

  res.send("Finance Tracker Backend Running");

});

app.use("/api", expenseRoutes);

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});