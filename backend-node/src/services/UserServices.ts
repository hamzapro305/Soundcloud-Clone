import userRepository from "../repository/UserRepository";
import { CustomError } from "../exceptions/CustomError";

class UserServices {
    public async sign_up(
        email: string,
        uid: string
    ) {
        try {
            const new_user = await userRepository.createUser(
                email,
                uid
            );
            if (new_user === null) {
                throw new CustomError("User Already Exists", 400);
            }

            return new_user;
        } catch (error) { }
    }
    public async getUserByEmail(email: string) {
        const user = await userRepository.getUserByEmail(email);
        return user;
    }
}

export default new UserServices();
