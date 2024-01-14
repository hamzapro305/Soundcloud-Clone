import axios from "axios";
import prisma from "../config/prisma-client";
import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";
import { Provider } from "../@Types/Provider";

class GoogleRepository {
    private readonly GOOGLE_USERINFO_URL = `https://www.googleapis.com/oauth2/v2/userinfo`;

    /**
     * Retrieves the Google profile information using the provided access token.
     * @param accessToken - The access token obtained from Google authentication.
     * @returns The Google profile information.
     */
    public readonly getGoogleProfile = async (accessToken: string) => {
        try {
            console.log(accessToken,"THis is access token")
            const res = await axios.get(this.GOOGLE_USERINFO_URL, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log(res,"this is response")
            return res.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    public readonly getGoogleByUID = async (uid: string) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    uid: uid,
                },
                include: {
                    google: true,
                },
            });
            if (user?.google == null) {
                throw new CustomError(
                    "Google Not Found for this UID",
                    HttpStatusCode.NOT_FOUND
                );
            }
            return user?.google as Provider["google"];
        } catch (error: any) {
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

    public readonly removeGoogle = async (
        google_id: string
    ): Promise<boolean> => {
        try {
            await prisma.google.delete({
                where: { google_id: google_id },
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    public readonly createGoogleForUser = async (
        uid: string,
        provider: Provider["google"]
    ) => {
        try {
            await prisma.google.create({
                data: {
                    google_id: provider.google_id,
                    access_token: provider.access_token,
                    refresh_token: provider.refresh_token ?? "",
                    user: {
                        connect: { uid: uid },
                    },
                },
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };
}

export default GoogleRepository;
