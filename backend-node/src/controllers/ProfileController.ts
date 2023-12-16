import { NextFunction, Request, Response } from "express";
import { autoInjectable } from "tsyringe";
import ProfileService from "../services/ProfileService";

@autoInjectable()
class ProfileController {
    private _profileService: ProfileService;
    constructor(_profileService: ProfileService) {
        this._profileService = _profileService;
    }
    
    public async updateProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const { uid, full_name, bio } = req.body;
            return await this._profileService.updateProfile(uid, { full_name, bio });

        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

export default ProfileController
