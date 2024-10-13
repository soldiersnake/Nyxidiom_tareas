import mongoose from "mongoose";

let isConnected:boolean = false;
let urlMongo:string = 'mongodb+srv://marianomacias:1234@prueba-tecnica.el5jm.mongodb.net/'

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
