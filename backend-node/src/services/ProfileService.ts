import { TProfile } from "../@Types/Profile";
import { ThrowCriticalError } from "../exceptions/CriticalError";
import ProfileRepository from "../repository/ProfileRepository";

type UpdateAbleProfile = Partial<Pick<TProfile, "full_name" | "bio">>

class ProfileService {
    private profileRepository: ProfileRepository;
    constructor() {
        this.profileRepository = new ProfileRepository();
    }

    async createProfile(uid: string): Promise<TProfile> {
        try {
            const new_profile = await this.profileRepository.createProfile(uid);
            return new_profile;

        } catch (error: any) {
            throw new ThrowCriticalError(error)
        }
    }
    async updateProfile(uid: string, data: UpdateAbleProfile): Promise<TProfile> {
        try {
            const new_profile = await this.profileRepository.updateProfile(uid, data);
            return new_profile;
        } catch (error: any) {
            throw new ThrowCriticalError(error)
        }
    }
    async getProfileByUID(uid: string) {
        try {
            const new_profile = await this.profileRepository.getProfileByUID(uid);
            return new_profile;
        } catch (error: any) {
            throw new ThrowCriticalError(error)
        }
    }
}

export default new ProfileService