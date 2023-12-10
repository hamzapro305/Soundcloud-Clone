import { Router } from "express";
import TestController from "../controllers/TestController";
import { MulterConfigured } from "../config/Multer";

const TestRouter = Router()
const upload = MulterConfigured([".zip", ".json"], "RAM")

TestRouter.get("/", TestController.getTest)
TestRouter.post("/upload", upload.single("file"), TestController.uploadFile)

export default TestRouter