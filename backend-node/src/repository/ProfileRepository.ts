import { TProfile } from "../@Types/Profile";
import prisma from "../config/prisma-client";
import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";


type UpdateAbleProfile = Partial<Pick<TProfile, "full_name" | "bio">>
class ProfileRepository {
    async createProfile(uid: string): Promise<TProfile> {
        try {
            const new_user = await prisma.profile.create({
                data: { uid },
            });
            return new_user;
        } catch (error) {
            throw new CustomError("Internal Server Error", HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
    }

    getProfileByUID = async (uid: string) => {
        try {
            const profile = await prisma.profile.findUnique({
                where: { uid }
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

    updateProfile = async (uid: string, data: UpdateAbleProfile) => {
        try {
            const user = await prisma.profile.update({
                where: { uid: uid },
                data: { ...data }
            })
            return user;
        } catch (error) {
            throw new CustomError("Internal Server Error", HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
    }

    addFollower = async (uid: string) => {
        try {
            const profile = await prisma.profile.update({
                where: { uid },
                data: {
                    followers_count: { increment: 1 }
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

    addFollowing = async (uid: string) => {
        try {
            const profile = await prisma.profile.update({
                where: { uid },
                data: { following_count: { increment: 1 } }
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

export default new ProfileRepository
