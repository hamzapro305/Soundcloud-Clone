import { User } from "../@Types/User";
import prisma from "../config/prisma-client";
import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";

type UpdateAbleUser = Partial<Pick<User, "facebook_id" | "google_id" | "password" | "email">>

class UserRepository {
    public createUserByLocal = async (data: Pick<User, "password" | "email">): Promise<User> => {
        try {
            const new_user = await prisma.user.create({
                data: {
                    email: data.email,
                    password: data.password,
                    facebook_id: "",
                    google_id: "",
                },
            });
            return new_user;
        } catch (error) {
            throw new CustomError("Internal Server Error", HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
    }


    public updateUserByUID = async (uid: string, data: UpdateAbleUser) => {
        try {
            const user = await prisma.user.update({
                where: {
                    uid: uid
                },
                data: {
                    ...data
                }
            })
            return user;
        } catch (error) {
            throw new CustomError("Internal Server Error", HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
    }

    public getUserByEmail = async (email: string) => {
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
    public getUserByUID = async (uid: string) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    uid: uid
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

}

export default UserRepository;
