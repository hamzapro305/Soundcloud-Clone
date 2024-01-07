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
        user_id: string,
        song_id: string,
        content: string,
        timestamp: number
    ) => {
        try {
            const profile = await this._profileService.getProfileByUID(
                user_id
            );
            await this._songRepository.getSongByID(song_id);
            const newComment = await this._commentRepository.createComment(
                profile.profile_id,
                song_id,
                content,
                timestamp
            );
            return newComment;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    public readonly updateComment = async (
        comment_id: string,
        content: string | undefined,
        timestamp:number | undefined,
    ) => {
        try {
            await this._commentRepository.getCommentByID(comment_id);
            const updatedComment = await this._commentRepository.updateComment(
                comment_id,
                content,
                timestamp
            );
            return updatedComment;
        } catch (error) {
            throw new CustomError(
                "Internal Server Error",
                HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    };    
    
    public readonly deleteComment = async (
        comment_id: string,
    ) => {
        try {
            await this._commentRepository.getCommentByID(comment_id);
            await this._commentRepository.deleteComment(
                comment_id,
            );
            return ;
        } catch (error) {
            throw new CustomError(
                "Internal Server Error",
                HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    };    
    
    public readonly getCommentsOnSong = async (
        song_id: string,
    ) => {
        try {
            await this._songRepository.getSongByID(song_id);
            const comments = await this._commentRepository.getCommentsOnSong(
                song_id,
            );
            return comments;
        } catch (error) {
            throw new CustomError(
                "Internal Server Error",
                HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    };
}

export default CommentService;
