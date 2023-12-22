import { User } from "./User"

export type Like = {
    like_id: string
    song_id: string
    user_id: string
    user: User
    created_at: Date
}