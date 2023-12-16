import "reflect-metadata";
import { NextFunction, Request, Response } from "express";
import { CustomError } from "../exceptions/CustomError";
import { UserServices } from "../services/UserServices";
import HttpStatusCode from "../utils/HttpStatusCode";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class UserController {
    _userServices: UserServices;
    constructor(_userServices: UserServices) {
        this._userServices = _userServices;
    }

    public async login(req: Request, res: Response, next: NextFunction) {
        console.log(req.body?.token)
        return res.status(HttpStatusCode.OK).json({ message: "Login Done" })
    }

    public async logout(req: Request, res: Response, next: NextFunction) {
        // Call req.logOut() to log the user out
        req.logOut(err => next(err));

        return res.status(HttpStatusCode.OK).json({ message: 'Logout Done!' });
    }

    public async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            if (!email || !password) throw new CustomError("Email, pass wrong", 400)
            try {
                const user = await this._userServices.SignUpLocal(
                    email,
                    password
                )
                res.status(200).json({ message: "user created" });
            } catch (error) {
                next(error)
            }
        } catch (error) {
            console.log(error)
            next(error)
        }
    }


    public async updateUser(req: Request, res: Response, next: NextFunction) {

    }
}

export default UserController;
