import { Constants } from "./config/Constants";
import mongoose from "mongoose";

function mongoConnection() {
  const MONGO_URI = Constants.mongo.uri;

  const options = {
    connectTimeoutMS: 30 * 1000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  async function connectWithRetry() {
    try {
      await mongoose.connect(MONGO_URI, options);
      console.info("MongoDB connected successfully");
    } catch (error) {
      console.error(
        "Failed to connect to MongoDB on startup - retrying in 5 seconds",
        error
      );

      if (mongoose.connection.readyState !== 1 && mongoose.connection.readyState !== 2) {
        setTimeout(connectWithRetry, 5000);
      }
    }
  }

  // Start the initial connection attempt
  connectWithRetry();

  // Enable Mongoose debug mode
  mongoose.set("debug", true);

  // Connection event handlers
  mongoose.connection.on("error", (err) => {
    console.error("Mongoose connection error:", err);
  });

  mongoose.connection.on("connected", () => {
    console.info("Mongoose connection: connected");
  });

  mongoose.connection.on("open", () => {
    console.info("Mongoose connection: open");
  });

  mongoose.connection.on("reconnected", () => {
    console.info("Mongoose connection: reconnected");
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("Mongoose connection: disconnected");
  });

  mongoose.connection.on("reconnectFailed", (err) => {
    console.error("Mongoose reconnect failed:", err);
    // Optionally capture error if you have capture.error(err);
  });

  // Handle graceful shutdown on SIGINT
  process.on("SIGINT", async () => {
    await mongoose.disconnect();
    process.exit(0);
  });

  return mongoose;
}

export default mongoConnection();
