import mongoose from "mongoose";

const mongooseConnect = async () => {
  try {
    console.log("Connecting to:", process.env.DATABASE_URL);
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to database");
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

export default mongooseConnect;
