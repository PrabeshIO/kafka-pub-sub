const kafka = require("./kafka-configs");

const consumer = kafka.consumer({ groupId: "my-consumer-group" });

const runConsumer = async () => {
  const decoder = new TextDecoder();
  // Connect the consumer
  await consumer.connect();
  console.log("Consumer connected");

  // Subscribe to a topic
  await consumer.subscribe({ topic: "user_updates", fromBeginning: true });

  // Run the consumer to listen for messages
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const decodedMessageValue = decoder.decode(message.value);
      console.log({data: JSON.parse(decodedMessageValue)});

      // do work based on respective messages
    },
  });
};

// Run the consumer
runConsumer().catch(console.error);
