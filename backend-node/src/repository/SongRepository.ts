import { singleton } from "tsyringe";
import { EmptySong } from "../@Types/Song";
import prisma from "../config/prisma-client";

@singleton()
class SongRepository {
    public readonly createSong = async (
        userID: string,
        data: Partial<EmptySong>
    ) => {
        try {
            const song = await prisma.song.create({
                data: {
                    thumbnail: "",
                    privacy: "PRIVATE",
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
                    ...data,
                },
            });
            return song;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    public readonly deleteSong = () => {};

    public readonly setSongPrivacy = () => {};
}

export default SongRepository;
