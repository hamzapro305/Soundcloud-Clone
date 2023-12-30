import { singleton } from "tsyringe";
import { TProfile, UpdateAbleProfile } from "../@Types/Profile";
import prisma from "../config/prisma-client";
import { ThrowCriticalError } from "../exceptions/CriticalError";
import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";

@singleton()
class ProfileRepository {
    createProfile = async (uid: string): Promise<TProfile> => {
        try {
            const new_user = await prisma.profile.create({
                data: { uid },
            });
            return new_user;
        } catch (error) {
            throw new ThrowCriticalError(error);
        }
    };

    getProfileByUID = async (uid: string) => {
        try {
            const profile = await prisma.profile.findUnique({
                where: { uid },
            });
            if (profile == null) {
                throw new CustomError(
                    "User Not Found",
                    HttpStatusCode.NOT_FOUND
                );
            }
            return profile;
        } catch (error: any) {
            throw new ThrowCriticalError(error);
        }
    };

    updateProfile = async (uid: string, data: UpdateAbleProfile) => {
        try {
            const profile = await prisma.profile.update({
                where: { uid: uid },
                data,
            });
            return profile;
        } catch (error) {
            throw new ThrowCriticalError(error);
        }
    };

    addFollower = async (uid: string) => {
        try {
            const profile = await prisma.profile.update({
                where: { uid },
                data: {
                    followers_count: { increment: 1 },
                },
            });

            return profile;
        } catch (error: any) {
            throw new ThrowCriticalError(error);
        }
    };

    

    addFollowing = async (uid: string) => {
        try {
            const profile = await prisma.profile.update({
                where: { uid },
                data: { following_count: { increment: 1 } },
            });
            return profile;
        } catch (error: any) {
            throw new ThrowCriticalError(error);
        }
    };
}

export default ProfileRepository;
