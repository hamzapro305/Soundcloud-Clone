import dotenv from "dotenv"

dotenv.config()

export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const BACKEND_PORT = process.env.BACKEND_PORT;