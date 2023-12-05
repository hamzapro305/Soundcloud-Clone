import { Router } from "express";
import followController from "../controllers/FollowController";
const follow_router = Router();

follow_router.post("/follow", followController.follow)

export default follow_router;