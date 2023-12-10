import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { FirebaseAuth } from "../config/Firebase";

export class AuthService {
    private Auth: typeof FirebaseAuth;
    constructor() {
        this.Auth = FirebaseAuth
    }

    createUserByEmailPass = (email: string, password: string): Promise<UserRecord> => {
        return new Promise(async (res, rej) => {
            try {
                const user = await this.Auth.createUser({
                    email: email,
                    password: password,
                })
                res(user)
            } catch (error) {
                console.log(error)
                rej(null)
            }
        })
    }

    verifyToken = async (token: string) => {
        try {
            const decodedToken = await this.Auth.verifyIdToken(token);

            // Access the user's ID and other information from the decoded token
            const userId = decodedToken.uid;
            const email = decodedToken.email;

            // Perform any additional logic or operations with the authenticated user

            return { success: true, message: 'User authenticated successfully' };
        } catch (error) {
            console.error('Error authenticating user:', error);
            return { success: false, message: 'Failed to authenticate user' };
        }

    }

}