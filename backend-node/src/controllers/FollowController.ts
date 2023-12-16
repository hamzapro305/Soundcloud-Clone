import { Request, Response } from "express";
import FollowService from "../services/FollowService";
import { autoInjectable } from "tsyringe";

@autoInjectable()
class FollowController {
    private _followServices: FollowService;
    constructor(_followServices: FollowService) {
        this._followServices = _followServices
    }
    public async follow(req: Request, res: Response) {
        const { followedById, followingId } = req.body;
        const user = await this._followServices.toggleFollow(followedById, followingId)
        res.status(200).json(user);
    }
}

export default FollowController;
