import { Router } from "express";
import TestController from "../controllers/TestController";
import { MulterConfigured } from "../config/Multer";

const testRouter = Router()
const upload = MulterConfigured([".zip"])

testRouter.get("/", TestController.getTest)
testRouter.post("/upload", upload.single("file"), TestController.uploadFile)

export default testRouter