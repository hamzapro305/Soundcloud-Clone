import { Request, Response } from "express";

export class TestController {
    public getTest(req: Request, res: Response) {
        res.status(200).send("test done")
    }
}