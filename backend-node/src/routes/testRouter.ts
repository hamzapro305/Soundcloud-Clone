import { Router } from "express";
import TestController from "../controllers/TestController";
import { MulterConfigured } from "../config/Multer";
import { container } from "tsyringe";
import { AuthMiddleware } from "../passport/AuthMiddleware";
import Validation from "../Middlewares/Validation";

const TestRouter = Router()
const upload = MulterConfigured([".zip", ".json"], "RAM")

const authMiddleware = container.resolve(AuthMiddleware)

TestRouter.get("/", Validation.UserLoginValidator, authMiddleware.isLoggedIn, TestController.getTest)
TestRouter.post("/upload", upload.single("file"), TestController.uploadFile)

export default TestRouter