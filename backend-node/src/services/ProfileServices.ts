import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";
import profileRepository from "../repository/ProfileRepository";
import { TProfile } from "../@Types/Profile";


class ProfileServices{
    async createProfile(userId:string) : Promise<TProfile> {
        try {
            const new_profile = await profileRepository.createProfile(userId);
            return new_profile;

        } catch (error: any) {
            throw new CustomError(
                error?.message as string || 'Internal Server Error',
                error?.httpCode || HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    }
}

export default ProfileServices