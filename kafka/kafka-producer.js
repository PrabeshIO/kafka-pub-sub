const kafka = require("./kafka-configs");

const producer = kafka.producer();

const runProducer = async () => {
  await producer
    .connect()
    .then(() => console.log("Connected to Kafka producer"));
};

// Function to send messages to Kafka
const sendMessage = async (topic, message) => {
  try {
    await producer.send({
      topic: topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    console.log("Message sent to Kafka:", message);
  } catch (error) {
    console.error("Error sending message to Kafka:", error);
  }
};
runProducer().catch((err) =>
  console.error(`Error connecting to Kafka producer: ${err}`)
);
module.exports = { sendMessage };
