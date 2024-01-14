import { NextFunction, Request, Response } from "express";
import { inject, singleton } from "tsyringe";
import ProfileService from "../services/ProfileService";
import HttpStatusCode from "../utils/HttpStatusCode";
import JWT_Utils from "../utils/JWT_Utils";

@singleton()
class ProfileController {
    constructor(
        @inject(ProfileService)
        private readonly _profileService: ProfileService,

        @inject(JWT_Utils)
        private readonly _JWT_Utils: JWT_Utils
    ) {}

    public updateProfile = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const user = this._JWT_Utils.getUserFromRequest(req)
            const { data } = req.body;

            const profile = await this._profileService.updateProfile(user.uid, {
                full_name: data?.full_name,
                bio: data?.bio,
            });

            return res.status(HttpStatusCode.OK).json({
                status: "updated",
                profile: profile,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    };

    public getCurrentUserProfile = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const user = this._JWT_Utils.getUserFromRequest(req)
            const profile = await this._profileService.getProfileByUID(
                user?.uid
            );
            return res.status(HttpStatusCode.OK).json({
                status: "fetched",
                profile: profile,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    };    
    
    public getProfilePic = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const {uid}=req.params
            const imageURL=await this._profileService.getProfilePic(uid);
            res.status(200).json(imageURL)

        } catch (error) {
            console.log(error);
            next(error);
        }
    };
}

export default ProfileController;
