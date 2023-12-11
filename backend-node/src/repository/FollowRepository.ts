import prisma from "../config/prisma-client";
import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";

class FollowRepository {

    async follow(followedById: string, followingId: string) {
        try {
            const follow = await prisma.follow.create({
                data: {
                    followedById,
                    followingId
                }
            })
            return follow
        } catch (error: any) {
            throw new CustomError(
                error?.message as string || 'Internal Server Error',
                error?.httpCode || HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    }
}

export default FollowRepository
