import axios from "axios";
import prisma from "../config/prisma-client";
import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";
import { Provider } from "../@Types/Provider";

export default class GoogleRepository {
    private readonly GOOGLE_USERINFO_URL = `https://www.googleapis.com/oauth2/v2/userinfo`;

    /**
     * Retrieves the Google profile information using the provided access token.
     * @param accessToken - The access token obtained from Google authentication.
     * @returns The Google profile information.
     */
    public readonly getGoogleProfile = async (accessToken: string) => {
        try {
            const res = await axios.get(this.GOOGLE_USERINFO_URL, {
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

    public readonly getGoogle = async (google_id: string) => {
        try {
            const google = await prisma.google.findUnique({
                where: {
                    google_id,
                },
            });
            if (google == null) {
                throw new CustomError(
                    "Google Not Found for this id",
                    HttpStatusCode.NOT_FOUND
                );
            }
            return google as Provider["google"];
        } catch (error: any) {
            console.log(error);
            return null;
        }
    };

    public readonly getGoogleAccount = async (google_id: string) => {
        try {
            const google = await this.getGoogle(google_id);
            const profile = await this.getGoogleProfile(
                google?.access_token as string
            );
            return profile;
        } catch (error) {
            console.log(error);
            return null;
        }
    };
}
