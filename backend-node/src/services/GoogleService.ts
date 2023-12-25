import { inject, injectable } from "tsyringe";
import GoogleRepository from "../repository/GoogleRepository";

@injectable()
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
}

export default GoogleService;
