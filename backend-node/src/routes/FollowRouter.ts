import { Router } from "express";
import followController from "../controllers/FollowController";


const FollowRouter = Router();
FollowRouter.post("/follow", followController.follow)

export default FollowRouter;