import mongoose from "mongoose";

export const connect = async () => {
  try {
    const connected = await mongoose.connect(process.env.MONGODB_URI!);
    if (connected) {
      console.log("Connected to DB");
    } else {
      console.log("Cannot connect to DB");
    }
  } catch (error) {
    throw new Error("Problem connecting to DB");
  }
};
