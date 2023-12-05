import { Router } from "express";
import userController from "../controllers/UserController";
const fllow_router = Router();

fllow_router.post("/follow", userController.signUp)

export default fllow_router;