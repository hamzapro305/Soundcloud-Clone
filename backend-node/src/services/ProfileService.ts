import { injectable } from "tsyringe";
import { TProfile } from "../@Types/Profile";
import { ThrowCriticalError } from "../exceptions/CriticalError";
import ProfileRepository from "../repository/ProfileRepository";

type UpdateAbleProfile = Partial<Pick<TProfile, "full_name" | "bio">>;

@injectable()
class ProfileService {
    constructor(private readonly _profileRepository: ProfileRepository) {}

    public createProfile = async (uid: string): Promise<TProfile> => {
        try {
            const new_profile = await this._profileRepository.createProfile(
                uid
            );
            return new_profile;
        } catch (error: any) {
            throw new ThrowCriticalError(error);
        }
    };
    public updateProfile = async (
        uid: string,
        data: UpdateAbleProfile
    ): Promise<TProfile> => {
        try {
            const new_profile = await this._profileRepository.updateProfile(
                uid,
                data
            );
            return new_profile;
        } catch (error: any) {
            throw new ThrowCriticalError(error);
        }
    };
    public getProfileByUID = async (uid: string) => {
        try {
            const new_profile = await this._profileRepository.getProfileByUID(
                uid
            );
            return new_profile;
        } catch (error: any) {
            throw new ThrowCriticalError(error);
        }
    };
}

export default ProfileService;
