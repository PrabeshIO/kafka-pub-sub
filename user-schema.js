const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { sendMessage } = require("./kafka/kafka-producer"); // Import sendMessage function

// Define the user schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  randomText: {
    type: String,
    default: "This is a random text",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Post-update middleware for updateOne
userSchema.post("updateOne", async function (result) {
  const message = {
    operationType: "updateOne",
    result,
  };
  await sendMessage("user_updates", message); // Send to Kafka topic
});

// Post-update middleware for updateMany
userSchema.post("updateMany", async function (result) {
  const message = {
    operationType: "updateMany",
    result,
  };
  await sendMessage("user_updates", message); // Send to Kafka topic
});

// Post-update middleware for findOneAndUpdate
userSchema.post("findOneAndUpdate", async function (doc, next) {
  const message = {
    operationType: "findOneAndUpdate",
    doc,
  };
  await sendMessage("user_updates", message); // Send to Kafka topic
  next(); // Ensure to call next() if you're using async/await
});

// Post-update middleware for findByIdAndUpdate
userSchema.post("findByIdAndUpdate", async function (doc, next) {
  const message = {
    operationType: "findByIdAndUpdate",
    doc,
  };
  await sendMessage("user_updates", message); // Send to Kafka topic
  next(); // Ensure to call next() if you're using async/await
});

// Post-update middleware for findOneAndReplace
userSchema.post("findOneAndReplace", async function (doc, next) {
  const message = {
    operationType: "findOneAndReplace",
    doc,
  };
  await sendMessage("user_updates", message); // Send to Kafka topic
  next(); // Ensure to call next() if you're using async/await
});

// Post-update middleware for findByIdAndRemove
userSchema.post("findByIdAndRemove", async function (doc, next) {
  const message = {
    operationType: "findByIdAndRemove",
    doc,
  };
  await sendMessage("user_updates", message); // Send to Kafka topic
  next(); // Ensure to call next() if you're using async/await
});

// Post-update middleware for remove
userSchema.post("remove", async function (doc, next) {
  const message = {
    operationType: "remove",
    doc,
  };
  await sendMessage("user_updates", message); // Send to Kafka topic
  next(); // Ensure to call next() if you're using async/await
});

// Create a User model from the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
