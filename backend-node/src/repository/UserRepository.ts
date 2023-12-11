import { User, UserLoginDTO } from "../@Types/User";
import prisma from "../config/prisma-client";
import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";

class UserRepository {
    async createUser(
        email: string,
        userId: string
    ): Promise<UserLoginDTO> {
        try {
            const new_user = await prisma.user.create({
                data: {
                    uid: userId,
                    username: "noob",
                    email: email,
                    bio: "",
                    full_name: "",
                    password: "",
                },
            });
            return new_user;
        } catch (error) {
            throw new CustomError("Internal Server Error", HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
    }

    getUserByEmail = async (email: string) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: email
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

export default new UserRepository();
