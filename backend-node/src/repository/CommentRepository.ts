import { singleton } from "tsyringe";
import prisma from "../config/prisma-client";

@singleton()
class CommentRepository {
    public readonly createComment = async (
        profile_id: string,
        song_id: string,
        content: string,
        timestamp:number
    ) => {
        try {
            const song = await prisma.comment.create({
                data: {
                    profile_id,
                    song_id,
                    content,
                    timestamp
                },
            });

            return song;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

}

export default CommentRepository;
