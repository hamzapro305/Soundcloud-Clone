import userRepository from "../repository/UserRepository";
import followRepository from "../repository/FollowRepository";
import { User, UserLoginDTO } from "../@Types/User";
import { CustomError } from "../exceptions/CustomError";

class FollowService {

    public async toggleFollow(follower_id: string, following_id: string) : Promise<Boolean> {
        try {
            const user = await userRepository.getUserByID(follower_id);
            if (!user) {
                throw new CustomError("User Not Found", 404);
            }

            const follow = await followRepository.follow(follower_id,following_id);

            const followedUser = await userRepository.addFollower(following_id);
            
            const followerUser = await userRepository.addFollowing(follower_id);

            return true

        } catch (error) {
            return false
        }
    }
}

export default new FollowService();