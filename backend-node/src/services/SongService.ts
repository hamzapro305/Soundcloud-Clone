import { inject, singleton } from "tsyringe";
import SongRepository from "../repository/SongRepository";
import { EmptySong } from "../@Types/Song";
import { storage } from "../config/Firebase";

@singleton()
class SongService {
    constructor(
        @inject(SongRepository)
        private readonly _songRepository: SongRepository
    ) {}

    public readonly createSong = async(userID: string,data:Partial<EmptySong>) => {
        try {
            const song=await this._songRepository.createSong(userID,data)
            return song
        } catch (error) {
            return null
        }
    };

    public readonly saveAudio = () => {
        // Firebase Storage Audio save hogi 
        // Iski koi na koi ID hogi
        return true
    };

    public readonly editSong = () => {
        // Use Id py edit kro
    };


    public readonly deleteSong = () => {};

    public readonly setSongPrivacy = () => {};
}

export default SongService;
