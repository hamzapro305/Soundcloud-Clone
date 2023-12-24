import "reflect-metadata";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { UserServices } from "../services/UserServices";
import ProfileService from "../services/ProfileService";
import HttpStatusCode from "../utils/HttpStatusCode";

@injectable()
export class UserController {
    constructor(
        @inject(UserServices)
        private readonly _userService: UserServices,

        @inject(ProfileService)
        private readonly _profileService: ProfileService,
    ) {}

    public readonly retrieveUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const uid = req.params?.uid;
            if (!uid) {
                return res.status(HttpStatusCode.NOT_FOUND).json({
                    message: "User Id Invalid",
                });
            }
            let user = await this._userService.getByUID(uid);
            if (!user) {
                return res.status(HttpStatusCode.NOT_FOUND).json({
                    message: "User not found",
                });
            }
            let userProfile = await this._profileService.getProfileByUID(uid);
            if (!userProfile) {
                return res.status(HttpStatusCode.NOT_FOUND).json({
                    message: "profile not found",
                });
            }
            return res.status(HttpStatusCode.OK).json({
                email: user?.email,
                ...userProfile,
            });
        } catch (error) {
            next(error);
        }
    };
}

export default UserController;
