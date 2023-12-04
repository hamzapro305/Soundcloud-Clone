import mongoose from "mongoose";
import { Application } from "express"
import { BACKEND_PORT, DB_HOST, DB_PORT } from ".";


const port = BACKEND_PORT || 3001;

// Connect to MongoDB
export const ConnectToDB = async (callBack: () => void): Promise<void> => {
    try {
        await mongoose
            .connect(`mongodb://${DB_HOST}:${DB_PORT}`)
        console.log("Connected to the database successfully");
        callBack()
    } catch (error) {
        console.log("Unable to connect to the database:", error);
    }
};