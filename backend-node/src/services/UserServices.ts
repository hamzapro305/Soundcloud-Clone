import UserRepository from "../repository/UserRepository";
import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";
import { ThrowCriticalError } from "../exceptions/CriticalError";
import { autoInjectable } from "tsyringe";
import ProfileRepository from "../repository/ProfileRepository";


@autoInjectable()
export class UserServices {
    private userRepository: UserRepository;
    private _profileRepository: ProfileRepository;
    constructor(_userRepository: UserRepository, _profileRepository: ProfileRepository) {
        this.userRepository = _userRepository;
        this._profileRepository = _profileRepository;
    }

    public async SignUpLocal(
        email: string,
        password: string
    ) {
        try {
            const new_user = await this.userRepository.createByLocal({ email, password });
            if (new_user === null) {
                throw new CustomError("User Already Exists", HttpStatusCode.BAD_REQUEST);
            }

            // Create user profile
            await this._profileRepository.createProfile(new_user.uid);

            return new_user;
        } catch (error: any) {
            throw new ThrowCriticalError(error)
        }
    }
    public async getUserByEmail(email: string) {
        const user = await this.userRepository.getByEmail(email);
        return user;
    }
}
