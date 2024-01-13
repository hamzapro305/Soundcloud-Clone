import { Router } from "express";
import TestController from "../controllers/TestController";
import { MulterConfigured } from "../config/Multer";
import { container } from "tsyringe";

const TestRouter = Router();
const upload = MulterConfigured([".zip", ".json"], {
    type: "RAM",
});

const testController = container.resolve(TestController);

TestRouter.post("/upload", upload.single("file"), testController.uploadFile);

export default TestRouter;
