import { Router } from "express";
import TestController from "../controllers/TestController";

const testRouter = Router()

testRouter.get("/", TestController.getTest)

export default testRouter