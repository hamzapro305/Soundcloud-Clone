import { inject, singleton } from "tsyringe";
import SongService from "../services/SongService";
import { NextFunction, Request, Response } from "express";
import JWT_Utils from "../utils/JWT_Utils";
import HttpStatusCode from "../utils/HttpStatusCode";
import { UploadService } from "../services/UploadService";
import { randomUUID } from "crypto";

@singleton()
export default class SongController {
    constructor(
        @inject(SongService)
        private readonly _songService: SongService,

        @inject(JWT_Utils)
        private readonly _JWT_Utils: JWT_Utils,

        @inject(UploadService)
        private readonly _uploadService: UploadService
    ) {}
    public readonly uploadSong = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const user = this._JWT_Utils.getUserFromRequest(req)
            const File = req.file;
            if(File && user) {
                let songId = randomUUID()
                const path = `user/${user?.uid}/songs/${songId}.mp3`

                this._songService.uploadSong(user?.uid, songId, File, path);
            }
        } catch (error) {
            next(error);
        }
    };
    public readonly createSong = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const user = this._JWT_Utils.getUserFromRequest(req)

            const data = req.body?.song;

            const song = await this._songService.createSong(user?.uid, data);
            return res
                .status(HttpStatusCode.OK)
                .json({ message: "Song Created", song });
        } catch (error) {
            next(error);
        }
    };

    public readonly updateSong = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const {song_id,song}=req.body;

            const updatedSong = await this._songService.updateSong(song_id, song);
            return res
                .status(HttpStatusCode.OK)
                .json({ message: "Song Created", updatedSong });
        } catch (error) {
            next(error);
        }
    };
}
