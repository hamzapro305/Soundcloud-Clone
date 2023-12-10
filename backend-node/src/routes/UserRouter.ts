import { Router } from "express";
import userController from "../controllers/UserController";
import { FirebaseAuth } from "../config/Firebase";

const UserRouter = Router();
UserRouter.post("/signup", userController.signUp)
UserRouter.post("/login", (req, res) => {
    FirebaseAuth.createCustomToken(`1K3eq5tGEITfqRol0HjrU358l5K2`)
        .then((customToken) => {
            res.status(200).json({ "token": customToken })
        })
        .catch((error) => {
            console.log('Error creating custom token:', error);
        });
})

export default UserRouter;