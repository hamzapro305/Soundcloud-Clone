import { Router } from "express";
import TestController from "../controllers/TestController";
import { MulterConfigured } from "../config/Multer";
import { container } from "tsyringe";
import AuthMiddleware from "../passport/AuthMiddleware";

const TestRouter = Router()
const upload = MulterConfigured([".zip", ".json"], "RAM")

const authMiddleware = container.resolve(AuthMiddleware);
const testController = container.resolve(TestController);

TestRouter.get("/", testController.getTest)
TestRouter.post("/upload", upload.single("file"), testController.uploadFile)

export default TestRouter