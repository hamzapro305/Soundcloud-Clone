import UserRepository from "../repository/UserRepository";
import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";
import profileService from "../services/ProfileService";
import { ThrowCriticalError } from "../exceptions/CriticalError";


export class UserServices {

    private userRepository: UserRepository;
    constructor() {
        this.userRepository = new UserRepository()
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
            await profileService.createProfile(new_user.uid);

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
