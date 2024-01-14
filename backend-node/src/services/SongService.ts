import { inject, singleton } from "tsyringe";
import SongRepository from "../repository/SongRepository";
import { EmptySong } from "../@Types/Song";
import ProfileService from "./ProfileService";
import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";
import UploadService from "./UploadService";

@singleton()
class SongService {
    constructor(
        @inject(SongRepository)
        private readonly _songRepository: SongRepository,

        @inject(ProfileService)
        private readonly _profileService: ProfileService,

        @inject(UploadService)
        private readonly _uploadService: UploadService
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
            console.log(error);
            return null;
        }
    };

    public readonly updateSong = async (
        songID: string,
        data: Partial<EmptySong>
    ) => {
        try {
            const updatedSong = await this._songRepository.updateSong(
                songID,
                data
            );
            return updatedSong;
        } catch (error) {
            throw new CustomError(
                "Internal Server Error",
                HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    };

    public readonly incrementPlayCount = async (songID: string) => {
        try {
            
            return await this._songRepository.incrementPlayCount(
                songID
            )
        } catch (error) {
            throw new CustomError(
                "Internal Server Error",
                HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    };

    public readonly uploadSong = async (
        uid: string,
        song_id: string,
        File: Express.Multer.File,
        path: string
    ) => {
        try {
            const song = await this.createSong(uid, {
                song_id: song_id,
            });
            if (!song)
                throw new CustomError(
                    "Song Creation Failed",
                    HttpStatusCode.BAD_GATEWAY
                );
            await this._uploadService.uploadDataUsingMemoryStorage(File, path);
            return song_id;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    public readonly deleteSong = () => {};

    public readonly setSongPrivacy = () => {};
}

export default SongService;
