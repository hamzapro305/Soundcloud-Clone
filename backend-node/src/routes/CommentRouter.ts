import { Router } from "express";
import { container } from "tsyringe";
import CommentController from "../controllers/CommentController";

const CommentRouter = Router();

const CommentsController = container.resolve(CommentController)

CommentRouter.post("/", CommentsController.postComment)
CommentRouter.get("/:song_id", CommentsController.getCommentsOnSong)
CommentRouter.delete("/:comment_id", CommentsController.deleteComment)
CommentRouter.put("/", CommentsController.updateComment)

export default CommentRouter;