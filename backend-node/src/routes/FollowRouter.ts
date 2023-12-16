import { Router } from "express";
import { container } from "tsyringe";
import FollowController from "../controllers/FollowController";

const FollowRouter = Router();

const followController = container.resolve(FollowController)

FollowRouter.post("/follow", followController.follow)

export default FollowRouter;