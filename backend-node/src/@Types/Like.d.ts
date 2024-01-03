import { User } from "./User"

export type TLike = {
    like_id: string
    song_id: string
    user_id: string
    user: User
    created_at: Date
}

export type TLikeDTO={
    like_id: string;
    song_id: string;
    created_at: Date;
    profile_id: string;
}