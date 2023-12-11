import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";
import { TProfile } from "../@Types/Profile";
import ProfileRepository from "../repository/ProfileRepository";

type UpdateAbleProfile = Partial<Pick<TProfile, "full_name" | "bio">>

class ProfileService{
    async createProfile(userId:string) : Promise<TProfile> {
        try {
            const profileRepository = new ProfileRepository()
            const new_profile = await profileRepository.createProfile(userId);
            return new_profile;

        } catch (error: any) {
            throw new CustomError(
                error?.message as string || 'Internal Server Error',
                error?.httpCode || HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    }
    async updateProfile(uid: string, data: UpdateAbleProfile){
        try {
            const profileRepository = new ProfileRepository()
            const new_profile = await profileRepository.updateProfile(uid,data);
            return new_profile;
        } catch (error: any) {
            throw new CustomError(
                error?.message as string || 'Internal Server Error',
                error?.httpCode || HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    }
    async getProfileByUID(uid: string){
        try {
            const profileRepository = new ProfileRepository()
            const new_profile = await profileRepository.getProfileByUID(uid);
            return new_profile;
        } catch (error: any) {
            throw new CustomError(
                error?.message as string || 'Internal Server Error',
                error?.httpCode || HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    }
}

export default ProfileService