import { NextFunction, Request, Response } from "express";
import TestService from "../services/TestService";

class TestController {
    public getTest(req: Request, res: Response) {
        res.status(200).send("test done " + TestService.calculateNumber(2, 3))
    }
}

export default new TestController()