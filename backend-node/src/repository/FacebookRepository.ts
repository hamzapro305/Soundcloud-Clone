import { Provider } from "../@Types/Provider";
import prisma from "../config/prisma-client";

class FacebookRepository {
    public createFacebookForUser = async (
        uid: string,
        provider: Provider["facebook"]
    ): Promise<boolean> => {
        try {
            await prisma.facebook.create({
                data: {
                    facebook_id: provider.facebook_id,
                    access_token: provider.access_token,
                    refresh_token: provider.refresh_token as string,
                    user: {
                        connect: {
                            uid: uid,
                        },
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

export default FacebookRepository;
