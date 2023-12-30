import { singleton } from "tsyringe";
import { EmptySong } from "../@Types/Song";
import prisma from "../config/prisma-client";

@singleton()
class SongRepository {
    public readonly createSong = async (
        profile_id: string,
        data: Partial<EmptySong>
    ) => {
        try {
            console.log("object")
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
                    created_at: new Date(Date.now()).toISOString(),
                    updated_at: new Date(Date.now()).toISOString(),
                    url: "",
                    song_playlist_id: "",
                    profile_id: profile_id,
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
