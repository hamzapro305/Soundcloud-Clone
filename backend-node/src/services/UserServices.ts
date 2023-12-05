import userRepository from "../repository/UserRepository";
import { CustomError } from "../exceptions/CustomError";
import { User, UserLoginDTO } from "../@Types/User";
import HttpStatusCode from "../utils/HttpStatusCode";

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
    ): Promise< UserLoginDTO> {
        try {
            const user = await userRepository.getUser(email, login_password);
            if (!user) {
                throw new CustomError("User Not Found", HttpStatusCode.NOT_FOUND);
            }
            // console.log(object)
            if (user.password !== login_password) {
                throw new CustomError("Invalid Password", HttpStatusCode.BAD_REQUEST);
            }
            const { password, ...user2 } = user;

            return user2;
        } catch (error) {
            throw new CustomError("Internal Server Error", HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
    }
}

export default new UserServices();
