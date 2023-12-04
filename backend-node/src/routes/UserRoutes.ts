import express, { Request, Response } from "express";
import userController from "../controllers/UserController";
const user_router = express.Router();

user_router.post("/signup",userController.sign_up)


export default user_router;