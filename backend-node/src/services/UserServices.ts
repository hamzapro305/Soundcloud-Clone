import { NextFunction, Request, Response } from "express";
import userRepository from "../repository/UserRepository";

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
            return await userRepository.createUser(username, full_name, bio, profile_picture, email, password);
        } catch (error) {
            
        }
    }

    public log_in() {
        return 
    }
}

export default new UserServices();
