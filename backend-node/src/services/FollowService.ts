import userRepository from "../repository/UserRepository";
import followRepository from "../repository/FollowRepository";
import { CustomError } from "../utils/CustomError";
import { User, UserLoginDTO } from "../@Types/User";

class FollowService {

    public async toggleFollow(follower_id: string, following_id: string) {
        try {
            const user = await userRepository.getUserByID(follower_id);
            if (!user) {
                return new CustomError("User Not Found", 404);
            }

            const follow = await followRepository.follow(follower_id,following_id);

            const followedUser = await userRepository.addFollower(following_id);
            
            const followerUser = await userRepository.addFollowing(following_id);

            return true

        } catch (error) {
            
        }
    }
}

export default new FollowService();