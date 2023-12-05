import prisma from "../config/prisma-client";

class FollowRepository {

    async follow(followedById: string, followingId: string) {
        try {
            const follow = await prisma.follow.create({
                data:{
                    followedById,
                    followingId
                }
            })

            return follow
        } catch (error) {
            
        }
    }
}

export default new FollowRepository();
