import { inject, singleton } from "tsyringe";
import SongService from "../services/SongService";
import { NextFunction, Request, Response } from "express";
import JWT_Utils from "../utils/JWT_Utils";
import HttpStatusCode from "../utils/HttpStatusCode";
import { CustomError } from "../exceptions/CustomError";

@singleton()
export default class SongController {
    constructor(
        @inject(SongService)
        private readonly _songService: SongService,

        @inject(JWT_Utils)
        private readonly _JWT_Utils: JWT_Utils
    ) {}
    public readonly createSong = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const user = this._JWT_Utils.verifyToken(
                this._JWT_Utils.extractToken(req)
            );
            
            const data = req.body?.song;

            const song = await this._songService.createSong(user?.uid, data);
            return res.status(HttpStatusCode.OK).json({ message: "Done", song });
        } catch (error) {
            next(error);
        }
    };
}
