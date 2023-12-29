import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "../utils/HttpStatusCode";
import { CustomError } from "../exceptions/CustomError";
import { UserServices } from "../services/UserServices";
import { inject, singleton } from "tsyringe";

@singleton()
export default class AuthController {
    constructor(
        @inject(UserServices)
        private readonly _userServices: UserServices
    ) {}
    public login = async (req: Request, res: Response, next: NextFunction) => {
        return res.status(HttpStatusCode.OK).json({ message: "Login Done" });
    };

    public signUp = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            if (!email || !password)
                throw new CustomError("Email, pass wrong", 400);
            try {
                const user = await this._userServices.SignUpLocal(
                    email,
                    password
                );
                res.status(200).json({ message: "user created" });
            } catch (error) {
                next(error);
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    };
    googleCallback = (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body);
        res.status(HttpStatusCode.OK).send("");
    };
}
