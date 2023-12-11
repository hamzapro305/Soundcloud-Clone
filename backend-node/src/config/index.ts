import dotenv from "dotenv"

dotenv.config()

export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_PORT = process.env.DB_PORT || "27017";
export const BACKEND_PORT = process.env.BACKEND_PORT || 8000;