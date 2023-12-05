import { Router } from "express";
import userController from "../controllers/UserController";
const user_router = Router();

user_router.post("/signup", userController.signUp)

user_router.post("/login", userController.logIn)


export default user_router;