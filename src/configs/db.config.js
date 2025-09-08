import mongoose from "mongoose";
import "dotenv/config";

const URL = process.env.MONGODB_URL;

const connectToDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("Connected to DataBase");
  } catch (error) {
    console.error(`FATAL ERROR: Failed to connect to DB: ${error.message}`);
    process.exit(1);
  }
};

export default connectToDB;
