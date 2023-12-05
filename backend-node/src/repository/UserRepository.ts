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

    async getUser(email: string, password: string) {
        try {
            const user= await prisma.user.findUnique({
                where:{
                    email
                }
            })

            return user
        } catch (error) {
            
        }
    }

    async getUserByID(user_id: string) {
        try {
            const user= await prisma.user.findUnique({
                where:{
                    user_id
                }
            })

            return user
        } catch (error) {
            
        }
    }

    async addFollower(user_id: string) {
        try {
            const user= await prisma.user.update({
                where:{
                    user_id
                },
                data:{
                    followers_count:{
                        increment:1
                    }
                }
            })

            return user
        } catch (error) {
            
        }
    }

    async addFollowing(user_id: string) {
        try {
            const user= await prisma.user.update({
                where:{
                    user_id
                },
                data:{
                    following_count:{
                        increment:1
                    }
                }
            })

            return user
        } catch (error) {
            
        }
    }


}

export default new UserRepository();
