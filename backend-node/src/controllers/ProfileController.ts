import { NextFunction, Request, Response } from "express";
import profileService from "../services/ProfileService";

class ProfileController {
    public async updateProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const { uid, full_name, bio } = req.body;
            return await profileService.updateProfile(uid,{full_name,bio});

        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

export default new ProfileController();
