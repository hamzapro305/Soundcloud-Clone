import { inject, singleton } from "tsyringe";
import SongService from "../services/SongService";
import { NextFunction, Request, Response } from "express";
import JWT_Utils from "../utils/JWT_Utils";
import HttpStatusCode from "../utils/HttpStatusCode";
import { randomUUID } from "crypto";
import LikeServices from "../services/LikeServices";

@singleton()
export default class LikeController {
    constructor(
        @inject(LikeServices)
        private readonly _likeServices: LikeServices
    ) {}
    public readonly toggleLike = async(
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { song_id, profile_id } = req.body;
            const likedSong = await this._likeServices.toggleLike(
                song_id,
                profile_id
            );
            res.status(200).json(likedSong);
        } catch (error) {
            next(error);
        }
    };
}
