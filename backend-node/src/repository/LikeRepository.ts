import { singleton } from "tsyringe";
import prisma from "../config/prisma-client";
import { TLikeDTO } from "../@Types/Like";
import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";

@singleton()
export default class LikeRepository {
    constructor() {}

    public readonly createLike = async (
        song_id: string,
        profile_id: string
    ): Promise<TLikeDTO> => {
        try {
            const like = await prisma.like.create({
                data: {
                    song_id,
                    profile_id,
                },
            });

            return like;
        } catch (error) {
            throw new CustomError(
                "Internal Server Error",
                HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    };

    public readonly isLiked = async (
        song_id: string,
        profile_id: string
    ): Promise<TLikeDTO[] | null> => {
        try {
            const like = await prisma.like.findMany({
                where: {
                    song_id,
                    profile_id,
                },
            });
            if (like.length>0) {
                return like;
            }

            return null;
        } catch (error) {
            throw new CustomError(
                "Internal Server Error",
                HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    };

    public readonly deleteLike = async (
        like_id: string,
    ): Promise<boolean> => {
        try {
            const like = await prisma.like.delete({
                where: {
                    like_id
                },
            });
            if (like) {
                return true;
            }

            return false;
        } catch (error) {
            throw new CustomError(
                "Internal Server Error",
                HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    };
}
