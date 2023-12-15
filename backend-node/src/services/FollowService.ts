import UserRepository from "../repository/UserRepository";
import ProfileRepository from "../repository/ProfileRepository";
import { CustomError } from "../exceptions/CustomError";
import FollowRepository from "../repository/FollowRepository";
import { ThrowCriticalError } from "../exceptions/CriticalError";

class FollowService {
    private userRepository: UserRepository;
    private profileRepository: ProfileRepository;
    private followRepository: FollowRepository;
    constructor() {
        this.userRepository = new UserRepository()
        this.profileRepository = new ProfileRepository()
        this.followRepository = new FollowRepository()
    }

    public async toggleFollow(follower_id: string, following_id: string): Promise<true | undefined> {
        try {
            const user = await this.userRepository.getByUID(follower_id);
            if (!user) {
                throw new CustomError("User Not Found", 404);
            }
            await this.followRepository.follow(follower_id, following_id);
            await this.profileRepository.addFollower(following_id);
            await this.profileRepository.addFollowing(follower_id);
            return true

        } catch (error: any) {
            throw new ThrowCriticalError(error)
        }
    }
}

export default new FollowService();