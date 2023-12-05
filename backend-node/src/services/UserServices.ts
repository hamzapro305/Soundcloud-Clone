import userRepository from "../repository/UserRepository";
import { CustomError } from "../exceptions/CustomError";
import { User, UserLoginDTO } from "../@Types/User";

class UserServices {
    public async sign_up(
        username: string,
        full_name: string,
        bio: string,
        profile_picture: string,
        email: string,
        password: string
    ) {
        try {
            const new_user = await userRepository.createUser(
                username,
                full_name,
                bio,
                profile_picture,
                email,
                password
            );
            if (new_user === null) {
                return new CustomError("User Already Exists", 400);
            }

            return new_user;
        } catch (error) {}
    }

    public async log_in(
        email: string,
        login_password: string
    ): Promise< UserLoginDTO | CustomError> {
        try {
            const user = await userRepository.getUser(email, login_password);
            if (!user) {
                return new CustomError("User Not Found", 404);
            }
            if (user.password !== login_password) {
                return new CustomError("Invalid Password", 400);
            }
            const { password, ...user2 } = user;

            return user2;
        } catch (error) {
            return new CustomError("Internal Server Error", 500);
        }
    }
}

export default new UserServices();
