import UserRepository from "../repository/UserRepository";
import ProfileRepository from "../repository/ProfileRepository";
import { CustomError } from "../exceptions/CustomError";
import FollowRepository from "../repository/FollowRepository";
import { ThrowCriticalError } from "../exceptions/CriticalError";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export default class FollowService {
    private userRepository: UserRepository;
    private profileRepository: ProfileRepository;
    private followRepository: FollowRepository;
    constructor(
        userRepository: UserRepository,
        profileRepository: ProfileRepository,
        followRepository: FollowRepository
    ) {
        this.userRepository = userRepository
        this.profileRepository = profileRepository
        this.followRepository = followRepository
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
