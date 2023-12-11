import { Follow } from "./Follow"
import { Playlist } from "./Playlist"
import { Song } from "./Song"
import { Comment } from "./Comment"

export type User = {
    uid: string
    email: string 
    password: string
    facebook_id: string
    google_id: string
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