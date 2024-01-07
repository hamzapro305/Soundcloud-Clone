import { singleton } from "tsyringe";
import prisma from "../config/prisma-client";
import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";

@singleton()
class CommentRepository {
    public readonly createComment = async (
        profile_id: string,
        song_id: string,
        content: string,
        timestamp:number
    ) => {
        try {
            const comment = await prisma.comment.create({
                data: {
                    profile_id,
                    song_id,
                    content,
                    timestamp
                },
            });

            return comment;
        } catch (error) {
            throw new CustomError(
                "Internal Server Error",
                HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    };

    public readonly getCommentByID = async (
        comment_id: string,
    ) => {
        try {
            const comment = await prisma.comment.findUnique({
                where:{
                    comment_id
                },
            });

            if (!comment) {
                throw new CustomError("This comment does not exist or has been deleted",HttpStatusCode.NOT_FOUND)
            }

            return comment;
        } catch (error) {
            throw new CustomError(
                "Internal Server Error",
                HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    };   
    
    public readonly updateComment = async (
        comment_id: string,
        content: string | undefined,
        timestamp:number | undefined,
    ) => {
        try {
            const comment = await prisma.comment.update({
                where:{
                    comment_id
                },
                data: {
                    content,
                    timestamp,
                    updated_at:new Date(Date.now()).toISOString()
                },
            });
            return comment;

        } catch (error:any) {
            console.log(error)
            throw new CustomError(
                error.message || "Internal Server Error",
                HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    };   
    
    public readonly deleteComment = async (
        comment_id: string,
    ) => {
        try {
            await prisma.comment.delete({
                where:{
                    comment_id
                },
            });

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
            const comments = await prisma.comment.findMany({
                where:{
                    song_id
                },
            });

            return comments;
        } catch (error) {
            throw new CustomError(
                "Internal Server Error",
                HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    };

}

export default CommentRepository;
