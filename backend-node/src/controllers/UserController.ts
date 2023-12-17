import "reflect-metadata";
import { NextFunction, Request, Response } from "express";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class UserController {

    public async updateUser(req: Request, res: Response, next: NextFunction) {

    }
}

export default UserController;
