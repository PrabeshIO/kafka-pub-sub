const { Kafka } = require("kafkajs");
require("dotenv").config();

// Replace these values with your Confluent Cloud configuration
const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: [process.env.KAFKA_BROKER_ID], // Replace with your Confluent Cloud Bootstrap Servers
  ssl: true,
  sasl: {
    mechanism: "plain", // Confluent uses plain
    username: process.env.KAFKA_API_KEY,
    password: process.env.KAFKA_API_SECRET_KEY,
  },
});

module.exports = kafka;
