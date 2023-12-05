import { NextFunction, Request, Response } from "express";
import followServices from "../services/FollowService";

class FollowController {
    
    public async follow(req: Request, res: Response) {
        const { followedById, followingId } = req.body;
        const user = await followServices.toggleFollow(followedById,followingId)
        res.status(200).json(user);
    }
}

export default new FollowController();
