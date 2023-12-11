import { NextFunction, Request, Response } from "express";
import userServices from "../services/UserServices";
import { AuthService } from "../services/AuthService";
import { FirebaseAuth } from "../config/Firebase";

class UserController {
    public async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const authService = new AuthService()
            try {
                const AuthUser = await authService.createUserByEmailPass(email, password);
                if (AuthUser.email) {
                    const user = await userServices.sign_up(
                        AuthUser.email,
                        AuthUser.uid
                    )
                    res.status(200).json({ message: "user created" });
                }
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
