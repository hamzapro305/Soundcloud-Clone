import { Follow } from "./Follow"
import { Playlist } from "./Playlist"
import { Song } from "./Song"
import { Comment } from "./Comment"

export type User = {
    user_id: string
    username: string
    email: string
    password: string
    full_name: string
    bio: string
    profile_picture: string
    followers_count: Int
    following_count: Int
    created_at: Date
    updated_at: Date

    // wo fields jo schema ne hide kia
    // saved_playlists: Playlist[]
    // comments: Comment[]
    // user_likes: Like[]
    // songs: Song[]
    // follows: Follow[]
    // followers: Follow[]
}

export type UserLoginDTO = Omit< User , "password" >