import { inject } from "tsyringe";
import SongService from "../services/SongService";
import { Request, Response } from "express";

export default class SongController {
    constructor(
        @inject(SongService)
        private readonly _songService: SongService
    ) {}
    public readonly createSong = async (
        req:Request, res:Response
    ) => {
        try {
            const {userID,...data}=req.body?.song;

            const song = await this._songService.createSong(userID, data);
            return song;
        } catch (error) {
            return null;
        }
    };
}
