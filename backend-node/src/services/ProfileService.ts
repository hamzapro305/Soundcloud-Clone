import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";
import profileRepository from "../repository/ProfileRepository";
import { TProfile } from "../@Types/Profile";

type UpdateAbleProfile = Partial<Pick<TProfile, "full_name" | "bio">>

class ProfileService{
    async createProfile(uid:string) : Promise<TProfile> {
        try {
            const new_profile = await profileRepository.createProfile(uid);
            return new_profile;

        } catch (error: any) {
            throw new CustomError(
                error?.message as string || 'Internal Server Error',
                error?.httpCode || HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    }
    async updateProfile(uid: string, data: UpdateAbleProfile) : Promise<TProfile>{
        try {
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

export default new ProfileService