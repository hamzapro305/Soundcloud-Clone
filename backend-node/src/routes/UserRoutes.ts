import { Router } from "express";
import userController from "../controllers/UserController";
const user_router = Router();

user_router.post("/signup", userController.signUp)


export default user_router;