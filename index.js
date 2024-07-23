const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./user-schema");

const app = express();
app.use(express.json());
const port = 4000;

// MongoDB connection string
const mongoURI = "mongodb://localhost:27017/mydatabase";

// Connect to MongoDB using Mongoose
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Handle successful connection
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB successfully");
});

// Handle connection errors
mongoose.connection.on("error", (err) => {
  console.error(`Failed to connect to MongoDB: ${err}`);
});

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/create-user", async (req, res) => {
  try {
    const user = new UserModel(req.body);
    const saved = await user.save();
    return res.json(saved);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.put("/update-user/:id", async (req, res) => {
  try {
    const updated = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: { randomText: req.body.randomText },
      },
      { new: true }
    ).lean();
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// run kafka producer
require("./kafka/kafka-producer");

//run kafka consumer
require("./kafka/kafka-consumer");

//start express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
