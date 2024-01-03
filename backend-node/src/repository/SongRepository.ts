import { singleton } from "tsyringe";
import { EmptySong } from "../@Types/Song";
import prisma from "../config/prisma-client";
import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";

@singleton()
class SongRepository {
    public readonly createSong = async (
        profile_id: string,
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
                    created_at: new Date(Date.now()).toISOString(),
                    updated_at: new Date(Date.now()).toISOString(),
                    song_playlist_id: "",
                    url: "",
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

    public readonly updateSong = async (
        song_id: string,
        data: Partial<EmptySong>
    ) => {
        try {
            await prisma.song.update({
                where: { song_id },
                data,
            });
        } catch (error) {
            console.log(error);
            throw new CustomError(
                "Internal Server Error",
                HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    };

    public readonly getSong = async (song_id: string) => {
        try {
            return await prisma.song.findUnique({
                where: { song_id },
            });
        } catch (error) {
            console.log(error);
            throw new CustomError(
                "Internal Server Error",
                HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    };

    public readonly deleteSong = () => {};

    public readonly setSongPrivacy = () => {};
}

export default SongRepository;
