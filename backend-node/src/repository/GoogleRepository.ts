import axios from "axios";

export default class GoogleRepository {
    readonly #GOOGLE_USERINFO_URL = `https://www.googleapis.com/oauth2/v2/userinfo`;

    /**
     * Retrieves the Google profile information using the provided access token.
     * @param accessToken - The access token obtained from Google authentication.
     * @returns The Google profile information.
     */
    public readonly getGoogleProfile = async (accessToken: string) => {
        try {
            const res = await axios.get(this.#GOOGLE_USERINFO_URL, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return res.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    };
}
