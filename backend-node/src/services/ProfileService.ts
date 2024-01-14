import { injectable } from "tsyringe";
import { TProfile, UpdateAbleProfile } from "../@Types/Profile";
import { ThrowCriticalError } from "../exceptions/CriticalError";
import ProfileRepository from "../repository/ProfileRepository";
import { UserServices } from "./UserServices";
import GoogleService from "./GoogleService";

@injectable()
class ProfileService {
    constructor(
        private readonly _profileRepository: ProfileRepository,
        private readonly _googleService: GoogleService
    ) {}

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

    public getProfilePic = async (uid: string) => {
        try {
            const imageURL = await this._googleService.getGooglePicfromUid(uid);
            return imageURL;
        } catch (error: any) {
            throw new ThrowCriticalError(error);
        }
    };
}

export default ProfileService;
