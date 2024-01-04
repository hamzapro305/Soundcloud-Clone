import { inject, singleton } from "tsyringe";
import CommentRepository from "../repository/CommentRepository";
import SongRepository from "../repository/SongRepository";
import { EmptySong } from "../@Types/Song";
import ProfileService from "./ProfileService";
import SongService from "./SongService";
import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";
import UploadService from "./UploadService";

@singleton()
class CommentService {
    constructor(
        @inject(CommentRepository)
        private readonly _commentRepository: CommentRepository,

        @inject(ProfileService)
        private readonly _profileService: ProfileService,

        @inject(SongRepository)
        private readonly _songRepository: SongRepository
    ) {}

    public readonly postComment = async (
        profile_id: string,
        song_id: string,
        content: string,
        timestamp:number
    ) => {
        try {
            const profile = await this._profileService.getProfileByUID(profile_id);
            await this._songRepository.getSong(song_id);
            const comment = await this._commentRepository.createComment(
                profile_id,
                song_id,
                content,
                timestamp
            );
            return comment;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    public readonly updateComment = async (
        songID: string,
        data: Partial<EmptySong>
    ) => {
        try {
            const updatedSong = await this._commentRepository.updateSong(
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
}

export default CommentService;
