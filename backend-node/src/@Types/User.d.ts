import { Follow } from "./Follow"
import { Playlist } from "./Playlist"
import { Song } from "./Song"
import { Comment } from "./Comment"

export type User = {
    uid: string
    username: string
    email: string
    bio: string
    followers_count: Int
    following_count: Int
}

export type TotalUser = User & {
    photoURL: string | undefined
    displayName: string | undefined
    phoneNumber: string | undefined
    disabled: boolean
    emailVerified: boolean
    creationTime: any
}

export type UserLoginDTO = Omit<User, "password">