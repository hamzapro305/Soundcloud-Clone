import { inject, singleton } from "tsyringe";
import GoogleRepository from "../repository/GoogleRepository";

@singleton()
class GoogleService {
    constructor(
        @inject(GoogleRepository)
        private readonly _googleRepository: GoogleRepository
    ) {}

    public readonly getGoogleAccount = async (google_id: string) => {
        try {
            const google = await this._googleRepository.getGoogle(google_id);
            const profile = await this._googleRepository.getGoogleProfile(
                google?.access_token as string
            );
            return profile;
        } catch (error) {
            console.log(error);
            return null;
        }
    };
    public readonly getGooglePicfromUid= async(uid:string)=>{
        try {
            const googleAccount=await this._googleRepository.getGoogleByUID(uid)
            const googleProfile = await this._googleRepository.getGoogleProfile(googleAccount?.access_token as string)
            return googleProfile.picture
        } catch (error) {
            
        }
    }
}

export default GoogleService;
