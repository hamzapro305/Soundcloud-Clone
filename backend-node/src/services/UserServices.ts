import UserRepository from "../repository/UserRepository";
import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";
import { ThrowCriticalError } from "../exceptions/CriticalError";
import { inject, singleton } from "tsyringe";
import { GoogleProvider } from "../@Types/Provider";
import { User } from "../@Types/User";
import ProfileService from "./ProfileService";

@singleton()
export class UserServices {
    constructor(
        @inject(UserRepository)
        private readonly _userRepository: UserRepository,

        @inject(UserRepository)
        private readonly _profileService: ProfileService
    ) {}

    public SignUpLocal = async (email: string, password: string) => {
        try {
            const new_user = await this._userRepository.createByLocal({
                email,
                password,
            });
            if (new_user === null) {
                throw new CustomError(
                    "User Already Exists",
                    HttpStatusCode.BAD_REQUEST
                );
            }

            return new_user;
        } catch (error: any) {
            throw new ThrowCriticalError(error);
        }
    };
    public createUserUsingGoogle = async (
        email: string,
        provider: GoogleProvider
    ) => {
        try {
            const user = await this._userRepository.createByGoogle(
                email,
                provider
            );
            if (!user) {
                return null;
            }
            const profile= await this._profileService.createProfile(user?.uid)
            if (!profile) {
                // If Profile is not created we also delete the user
                await this._userRepository.deleteUser(user.uid)
                return null
            }

            return user;
        } catch (error) {
            return null;
        }
    };
    public getUserByEmail = async (email: string) => {
        const user = await this._userRepository.getByEmail(email);
        return user;
    };
    public getByUID = async (uid: string): Promise<User | null> => {
        try {
            return await this._userRepository.getByUID(uid);
        } catch (error) {
            return null;
        }
    };
    public readonly isGoogleConnected = (_uid: string) => {};
    public readonly isFacebookConnected = (_uid: string) => {};
}
