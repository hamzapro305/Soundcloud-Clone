import { Privacy } from "./Privacy"
import { Song } from "./Song"

export type Playlist = {
    playlist_id: string
    created_by: string
    title: string
    privacy: Privacy
    description: string
    songs: Song[]
    likes_count: number
    created_at: Date
    updated_at: Date
    user_id: string
}