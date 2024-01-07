import { inject, singleton } from "tsyringe";
import CommentServices from "../services/CommentServices";
import { NextFunction, Request, Response } from "express";
import JWT_Utils from "../utils/JWT_Utils";
import HttpStatusCode from "../utils/HttpStatusCode";
import { randomUUID } from "crypto";
import UploadService from "../services/UploadService";

@singleton()
export default class SongController {
    constructor(
        @inject(CommentServices)
        private readonly _commentService: CommentServices,

        @inject(JWT_Utils)
        private readonly _JWT_Utils: JWT_Utils,

        @inject(UploadService)
        private readonly _uploadService: UploadService
    ) {}
    public readonly postComment = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const user = this._JWT_Utils.getUserFromRequest(req);
            const {  song_id, content, timestamp } = req.body;
            const newComment=await this._commentService.postComment(
                user.uid,
                song_id,
                content,
                timestamp
            );

            res.status(200).json(newComment)
        } catch (error) {
            next(error);
        }
    };

    public readonly updateComment = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const user = this._JWT_Utils.getUserFromRequest(req);
            const { comment_id, content, timestamp } = req.body;
            const updatedComment = await this._commentService.updateComment(
                comment_id,
                content,
                timestamp
            );
            res.status(200).json(updatedComment);
        } catch (error) {
            next(error);
        }
    };

    public readonly deleteComment = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const user = this._JWT_Utils.getUserFromRequest(req);

            const {comment_id} = req.params;

            await this._commentService.deleteComment(comment_id);
            return res
                .status(HttpStatusCode.OK)
                .json({ message: "Comment Deleted"});
        } catch (error) {
            next(error);
        }
    };

    public readonly getCommentsOnSong = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { song_id } = req.params;

            const comments = await this._commentService.getCommentsOnSong(
                song_id,
            );
            return res
                .status(HttpStatusCode.OK)
                .json(comments);
        } catch (error) {
            next(error);
        }
    };
}
