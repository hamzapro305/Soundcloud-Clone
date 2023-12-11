import UserRepository from "../repository/UserRepository";
import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";

class UserServices {
    public async SignUpLocal(
        email: string,
        password: string
    ) {
        try {
            const userRepository = new UserRepository()
            const new_user = await userRepository.createUserByLocal({ email, password });
            if (new_user === null) {
                throw new CustomError("User Already Exists", HttpStatusCode.BAD_REQUEST);
            }

            return new_user;
        } catch (error: any) {
            throw new CustomError(
                error?.message as string || 'Internal Server Error',
                error?.httpCode || HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    }
    public async getUserByEmail(email: string) {
        const userRepository = new UserRepository()
        const user = await userRepository.getUserByEmail(email);
        return user;
    }
}

export default new UserServices();
