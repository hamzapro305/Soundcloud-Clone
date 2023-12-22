import { Playlist } from "./Playlist"

export type Song = {
    song_id: String
    thumbnail: String
    privacy: Privacy
    upload_by: User
    title: String
    description: String
    genre: String
    duration: String
    likes_count: Int
    plays_count: Int
    comments_count: Int
    created_at: DateTime
    updated_at: DateTime
    url: String
    song_playlist_id: String
}