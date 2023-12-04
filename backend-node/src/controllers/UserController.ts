import { NextFunction, Request, Response } from "express";
import userServices from "../services/UserServices";

class UserController {
    public async sign_up(req: Request, res: Response) {
        const { username, full_name, bio, profile_picture, email, password } = req.body;
        const user = await userServices.sign_up(username, full_name, bio, profile_picture, email, password)
        res.status(200).json(user);
    }

    public log_in(req: Request, res: Response) {
        res.status(200).send("test done ");
    }
}

export default new UserController();
