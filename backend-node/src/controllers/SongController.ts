import { inject } from "tsyringe";
import SongService from "../services/SongService";

export default class SongController {
    constructor(
        @inject(SongService)
        private readonly _songService: SongService
    ) {}
    public readonly createSong = async (
        req:Request, res:Response
    ) => {
        try {
            
            
            const song = await this._songService.createSong("userID", data);
            return song;
        } catch (error) {
            return null;
        }
    };
}
