import { inject, singleton } from "tsyringe";
import SongRepository from "../repository/SongRepository";
import { EmptySong } from "../@Types/Song";
import ProfileService from "./ProfileService";

@singleton()
class SongService {
    constructor(
        @inject(SongRepository)
        private readonly _songRepository: SongRepository,

        @inject(ProfileService)
        private readonly _profileService: ProfileService
    ) {}

    public readonly createSong = async (
        userID: string,
        data: Partial<EmptySong>
    ) => {
        try {
            const profile = await this._profileService.getProfileByUID(userID);
            const song = await this._songRepository.createSong(
                profile.profile_id,
                data
            );
            return song;
        } catch (error) {
            return null;
        }
    };

    public readonly saveAudio = () => {
        // Firebase Storage Audio save hogi
        // Iski koi na koi ID hogi
        return true;
    };

    public readonly editSong = () => {
        // Use Id py edit kro
    };

    public readonly deleteSong = () => {};

    public readonly setSongPrivacy = () => {};
}

export default SongService;
