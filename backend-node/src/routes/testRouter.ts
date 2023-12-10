import { Router } from "express";
import TestController from "../controllers/TestController";
import { MulterConfigured } from "../config/Multer";
import AuthMiddleware from "../Middlewares/AuthMiddleware";

const TestRouter = Router()
const upload = MulterConfigured([".zip", ".json"], "RAM")

TestRouter.get("/", AuthMiddleware, TestController.getTest)
TestRouter.post("/upload", AuthMiddleware, upload.single("file"), TestController.uploadFile)

export default TestRouter