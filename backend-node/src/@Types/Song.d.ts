import { Playlist } from "./Playlist";
import { Privacy } from "./Privacy";
import { User } from "./User";

export type Song = {
    song_id: string;
    thumbnail: string;
    profile_id: string;
    privacy: Privacy;
    upload_by: User;
    title: string;
    description: string;
    genre: string;
    duration: string;
    likes_count: number;
    plays_count: number;
    comments_count: number;
    created_at: number;
    updated_at: number;
    url: string;
    song_playlist_id: string;
};

export type SongDTO = {
    song_id: string;
    thumbnail: string;
    profile_id: string;
    privacy: "PUBLIC" | "PRIVATE";
    title: string;
    description: string;
    genre: string;
    duration: string;
    likes_count: number;
    plays_count: number;
    comments_count: number;
    created_at: Date;
    updated_at: Date | null;
    url: string;
    song_playlist_id: string | null;
};

export type EmptySong = {
    thumbnail: string;
    title: string;
    description: string;
    genre: string;
    duration: string;
    url: string;
    song_playlist_id: string;
    song_id: string;
};
