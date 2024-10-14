import dotenv   from "dotenv";
import mongoose from "mongoose";
dotenv.config();

let isConnected:boolean = false;
let urlMongo:string = process.env.MONGODB_URI || '';

export async function connectDb() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(urlMongo);
    isConnected = true;
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("No fue posible la conexcion a MongoDB", error);
    throw new Error("Database connection failed.");
  }
}
