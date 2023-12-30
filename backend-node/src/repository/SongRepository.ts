import { Privacy } from "../@Types/Privacy";
import { EmptySong, Song, SongDTO } from "../@Types/Song";
import prisma from "../config/prisma-client";



class SongRepository {

    public readonly createSong = async (userID: string,data:Partial<EmptySong>) => {
        try {
            await prisma.song.create({
                data: {
                    thumbnail: "",
                    privacy: "PUBLIC",
                    title: "",
                    description: "",
                    genre: "",
                    duration: "",
                    likes_count: 0,
                    plays_count: 0,
                    comments_count: 0,
                    created_at: "",
                    updated_at: "",
                    url: "",
                    song_playlist_id: "",
                    profile_id: userID,
                    ...data
                },
            });
        } catch (error) {}
    };

    public readonly deleteSong = () => {};

    public readonly setSongPrivacy = () => {};
}

export default SongRepository;
