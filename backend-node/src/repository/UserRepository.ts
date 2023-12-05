import { UserLoginDTO } from "../@Types/User";
import prisma from "../config/prisma-client";
import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";

class UserRepository {
    async createUser(
        username: string,
        full_name: string,
        bio: string,
        profile_picture: string,
        email: string,
        password: string
    ): Promise<UserLoginDTO> {
        try {
            const new_user = await prisma.user.create({
                data: {
                    username,
                    full_name,
                    bio,
                    profile_picture,
                    email,
                    password,
                },
            });

            return new_user;
        } catch (error) {
            throw new CustomError("Internal Server Error", HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
    }

    async getUser(email: string, password: string): Promise<UserLoginDTO> {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email
                }
            })
            if (user == null) {
                throw new CustomError("User Not Found", HttpStatusCode.NOT_FOUND);
            }
            return user
        } catch (error) {
            throw new CustomError("Internal Server Error", HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
    }
}

export default new UserRepository();
