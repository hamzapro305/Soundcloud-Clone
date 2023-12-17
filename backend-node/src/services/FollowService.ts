import UserRepository from "../repository/UserRepository";
import ProfileRepository from "../repository/ProfileRepository";
import { CustomError } from "../exceptions/CustomError";
import FollowRepository from "../repository/FollowRepository";
import { ThrowCriticalError } from "../exceptions/CriticalError";
import { inject, injectable } from "tsyringe";

@injectable()
export default class FollowService {
    constructor(
        @inject(UserRepository)
        private readonly userRepository: UserRepository,

        @inject(ProfileRepository)
        private readonly profileRepository: ProfileRepository,

        @inject(FollowRepository)
        private readonly followRepository: FollowRepository
    ) {}

    public toggleFollow = async (follower_id: string, following_id: string): Promise<true | undefined> => {
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
