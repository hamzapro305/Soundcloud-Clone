import { Request, Response } from "express";
import FollowService from "../services/FollowService";
import { inject, injectable } from "tsyringe";

@injectable()
class FollowController {
    constructor(
        @inject(FollowService)
        private readonly _followServices: FollowService
    ) {}
    public follow = async (req: Request, res: Response) => {
        const { followedById, followingId } = req.body;
        const user = await this._followServices.toggleFollow(
            followedById,
            followingId
        );
        res.status(200).json(user);
    };
}

export default FollowController;
