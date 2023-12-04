import prisma from "../config/prisma-client";

class UserRepository {
    async createUser(
        username: string,
        full_name: string,
        bio: string,
        profile_picture: string,
        email: string,
        password: string
    ) {
        try {
            const new_user = await prisma.user.create({
                data: {
                    username,
                    full_name,
                    bio,
                    profile_picture,
                    email,
                    password,
                },
            });

            return new_user;
        } catch (error) {
            return null;
        }
    }
}

export default new UserRepository();
