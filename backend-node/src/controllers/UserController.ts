import { NextFunction, Request, Response } from "express";
import userServices from "../services/UserServices";

class UserController {
    public async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            try {
                const user = await userServices.SignUpLocal(
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

export default new UserController();
