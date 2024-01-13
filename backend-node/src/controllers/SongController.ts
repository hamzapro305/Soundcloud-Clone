import { inject, singleton } from "tsyringe";
import SongService from "../services/SongService";
import { NextFunction, Request, Response } from "express";
import JWT_Utils from "../utils/JWT_Utils";
import HttpStatusCode from "../utils/HttpStatusCode";
import { randomUUID } from "crypto";
import UploadService from "../services/UploadService";

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

    public readonly incrementPlayCount = async(
        req: Request,
        res: Response,
        next: NextFunction
    )=>{
        try {
            const {songID}= req.params;
            await this._songService.incrementPlayCount(songID)
            res.status(200).json(true)
        } catch (error) {
            next(error);
        }
    }

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
