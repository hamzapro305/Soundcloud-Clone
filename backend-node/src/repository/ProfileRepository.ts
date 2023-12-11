import { TProfile } from "../@Types/Profile";
import { User, UserLoginDTO } from "../@Types/User";
import prisma from "../config/prisma-client";
import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";

class ProfileRepository {
    async createUser(
        userId: string,
        fullname: string,
        bio: string,
    ): Promise<TProfile> {
        try {
            const new_user = await prisma.profile.create({
                data: {
                    fullname,
                    bio,
                    uid: userId,
                },
            });
            return new_user;
        } catch (error) {
            throw new CustomError("Internal Server Error", HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
    }

    getUserByUsername = async (fullname: string) => {
        try {
            const profile = await prisma.profile.findUnique({
                where: {
                    fullname: fullname
                }
            })
            if (profile == null) {
                throw new CustomError("User Not Found", HttpStatusCode.NOT_FOUND);
            }
            return profile
        } catch (error: any) {
            throw new CustomError(
                error?.message as string || 'Internal Server Error',
                error?.httpCode || HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    }
    getProfileByUID = async (uid: string) => {
        try {
            const profile = await prisma.profile.findUnique({
                where: {
                    uid
                }
            })
            if (profile == null) {
                throw new CustomError("User Not Found", HttpStatusCode.NOT_FOUND);
            }
            return profile
        } catch (error: any) {
            throw new CustomError(
                error?.message as string || 'Internal Server Error',
                error?.httpCode || HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    }


    async addFollower(uid: string) {
        try {
            const profile = await prisma.profile.update({
                where: {
                    uid
                },
                data: {
                    followers_count: {
                        increment: 1
                    }
                }
            })

            return profile
        } catch (error: any) {
            throw new CustomError(
                error?.message as string || 'Internal Server Error',
                error?.httpCode || HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    }

    async addFollowing(uid: string) {
        try {
            const profile = await prisma.profile.update({
                where: {
                    uid
                },
                data: {
                    following_count: {
                        increment: 1
                    }
                }
            })

            return profile
        } catch (error: any) {
            throw new CustomError(
                error?.message as string || 'Internal Server Error',
                error?.httpCode || HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    }


}

export default new ProfileRepository();
