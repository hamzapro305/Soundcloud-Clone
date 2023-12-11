import { Request, Response } from "express";
import HttpStatusCode from "../utils/HttpStatusCode";
// import { AuthService } from "../services/AuthService";

const AuthMiddleware = async (req: Request, res: Response) => {

    const Token = req?.body?.headers?.Authorization
    if (Token == null || Token == undefined) {
        res.status(HttpStatusCode.UNAUTHORIZED).json({ message: "Private Route!!" })
    }

    // const authService = new AuthService();
    // if (await authService.verifyToken(Token)) {
    //     res.status(HttpStatusCode.UNAUTHORIZED).json({ message: "Token is invalid or expired!!" })
    // }

}
export default AuthMiddleware