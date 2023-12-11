import { User, UserLoginDTO } from "../@Types/User";
import prisma from "../config/prisma-client";
import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";

class ProfileRepository {
    async createUser(
        userId: string,
        full_name: string,
        bio: string,
        password: string,
    ): Promise<UserLoginDTO> {
        try {
            const new_user = await prisma.profile.create({
                data: {
                    full_name,
                    bio,
                    uid: userId,
                },
            });
            return new_user;
        } catch (error) {
            throw new CustomError("Internal Server Error", HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
    }

    getUserByUsername = async (username: string) => {
        try {
            const user = await prisma.profile.findUnique({
                where: {
                    username: username
                }
            })
            if (user == null) {
                throw new CustomError("User Not Found", HttpStatusCode.NOT_FOUND);
            }
            return user
        } catch (error: any) {
            throw new CustomError(
                error?.message as string || 'Internal Server Error',
                error?.httpCode || HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    }
    getUserByUID = async (email: string) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    uid: email
                }
            })
            if (user == null) {
                throw new CustomError("User Not Found", HttpStatusCode.NOT_FOUND);
            }
            return user
        } catch (error: any) {
            throw new CustomError(
                error?.message as string || 'Internal Server Error',
                error?.httpCode || HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    }


    async addFollower(user_id: string) {
        try {
            const user = await prisma.user.update({
                where: {
                    uid: user_id
                },
                data: {
                    followers_count: {
                        increment: 1
                    }
                }
            })

            return user
        } catch (error: any) {
            throw new CustomError(
                error?.message as string || 'Internal Server Error',
                error?.httpCode || HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    }

    async addFollowing(user_id: string) {
        try {
            const user = await prisma.user.update({
                where: {
                    uid: user_id
                },
                data: {
                    following_count: {
                        increment: 1
                    }
                }
            })

            return user
        } catch (error: any) {
            throw new CustomError(
                error?.message as string || 'Internal Server Error',
                error?.httpCode || HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    }


}

export default new ProfileRepository();
