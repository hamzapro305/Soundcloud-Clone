import UserRepository from "../repository/UserRepository";
import ProfileRepository from "../repository/ProfileRepository";
import { CustomError } from "../exceptions/CustomError";
import FollowRepository from "../repository/FollowRepository";
import { ThrowCriticalError } from "../utils/Functions";

class FollowService {

    public async toggleFollow(follower_id: string, following_id: string): Promise<true | undefined> {
        try {
            const userRepository = new UserRepository()
            const profileRepository = new ProfileRepository()
            const followRepository = new FollowRepository()
            const user = await userRepository.getByUID(follower_id);
            if (!user) {
                throw new CustomError("User Not Found", 404);
            }
            await followRepository.follow(follower_id, following_id);
            await profileRepository.addFollower(following_id);
            await profileRepository.addFollowing(follower_id);
            return true

        } catch (error: any) {
            ThrowCriticalError(error)
        }
    }
}

export default new FollowService();