import { singleton } from "tsyringe";
import { User } from "../@Types/User";
import prisma from "../config/prisma-client";
import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";
import { Provider } from "../@Types/Provider";

@singleton()
class UserRepository {
    public getByGoogleId = async (google_id: string): Promise<User | null> => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    google_id: google_id,
                },
            });
            if (user == null) {
                throw new CustomError(
                    "User Not Found",
                    HttpStatusCode.NOT_FOUND
                );
            }
            return user as User;
        } catch (error: any) {
            return null;
        }
    };
    public getByFacebookId = async (
        facebook_id: string
    ): Promise<User | null> => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    facebook_id: facebook_id,
                },
            });
            if (user == null) {
                throw new CustomError(
                    "User Not Found",
                    HttpStatusCode.NOT_FOUND
                );
            }
            return user as User;
        } catch (error: any) {
            return null;
        }
    };
    public getByEmail = async (email: string) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });
            if (user == null) {
                throw new CustomError(
                    "User Not Found",
                    HttpStatusCode.NOT_FOUND
                );
            }
            return user as User;
        } catch (error: any) {
            return null;
        }
    };
    public getByUID = async (uid: string) => {
        try {
            const user = await prisma.user.findUnique({
                where: { uid: uid },
            });
            if (user == null) {
                throw new CustomError(
                    "User Not Found",
                    HttpStatusCode.NOT_FOUND
                );
            }
            return user as User;
        } catch (error: any) {
            return null;
        }
    };
    public createByGoogle = async (
        email: string,
        provider: Provider["google"]
    ): Promise<User | null> => {
        try {
            const createdUser = await prisma.user.create({
                data: {
                    email,
                    google: {
                        create: {
                            google_id: provider.google_id,
                            access_token: provider.access_token,
                            refresh_token: provider.refresh_token,
                        },
                    },
                    profile: {
                        create: {},
                    },
                },
            });
            return createdUser as User;
        } catch (error) {
            console.log(error)
            return null;
        }
    };
    public createByFacebook = async (
        email: string,
        provider: Provider["facebook"]
    ): Promise<User | null> => {
        try {
            const createdUser = await prisma.user.create({
                data: {
                    email,
                    facebook: {
                        create: {
                            facebook_id: provider.facebook_id,
                            access_token: provider.access_token,
                            refresh_token: provider.refresh_token,
                        },
                    },
                },
            });
            return createdUser as User;
        } catch (error) {
            console.log(error)
            return null;
        }
    };
    private createEmptyUser = async (email: string): Promise<User | null> => {
        try {
            const new_user = await prisma.user.create({
                data: {
                    email: email,
                },
            });
            return new_user as User;
        } catch (error) {
            console.log(error)
            return null;
        }
    };
    public createByLocal = async (
        data: Pick<User, "password" | "email">
    ): Promise<User | null> => {
        try {
            const new_user = await prisma.user.create({
                data: {
                    email: data.email,
                    password: data.password as string,
                    profile: {
                        create: {},
                    },
                },
            });
            return new_user as User;
        } catch (error) {
            console.log(error)
            return null;
        }
    };
    public updateByUID = async (
        uid: string,
        data: Pick<User, "password" | "email">
    ): Promise<User | null> => {
        try {
            const user = await prisma.user.update({
                where: {
                    uid: uid,
                },
                data: {
                    ...data,
                },
            });
            return user as User;
        } catch (error) {
            console.log(error)
            return null;
        }
    };   
     public deleteUser = async (
        uid: string
    ) => {
        try {
            await prisma.user.delete({
                where: {
                    uid: uid,
                }
            });
            return true
        } catch (error) {
            console.log(error)
            return false;
        }
    };
}

export default UserRepository;
