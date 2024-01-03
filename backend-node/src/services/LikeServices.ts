import { inject, singleton } from "tsyringe";
import SongRepository from "../repository/SongRepository";
import LikeRepository from "../repository/LikeRepository";
import { SongDTO } from "../@Types/Song";
import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";

@singleton()
class LikeServices {
    constructor(
        @inject(SongRepository)
        private readonly _songRepository: SongRepository,

        @inject(LikeRepository)
        private readonly _likeRepository: LikeRepository
    ) {}

    public readonly toggleLike = async (
        song_id: string,
        profile_id: string
    ): Promise<SongDTO> => {
        try {
            // check if song exists
            const song = await this._songRepository.getSong(song_id);

            // check if user has already liked the song
            const isLiked = await this._likeRepository.isLiked(
                song_id,
                profile_id
            );

            if (isLiked) {
                // delete the like
                await this._likeRepository.deleteLike(isLiked[0].like_id);

                // decrement the like
                await this._songRepository.toggleLike(song_id, {
                    type: "decrement",
                });
            } else {
                // create a like
                const like = await this._likeRepository.createLike(
                    song_id,
                    profile_id
                );

                // increment the like count
                await this._songRepository.toggleLike(song_id, {
                    type: "increment",
                });
            }
            return song;
        } catch (error) {
            throw new CustomError(
                "Internal Server Error",
                HttpStatusCode.NOT_FOUND
            );
        }
    };
}

export default LikeServices;
