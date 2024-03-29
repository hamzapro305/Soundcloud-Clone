import { singleton } from "tsyringe";
import { EmptySong, SongDTO, TEditableSong } from "../@Types/Song";
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

    public readonly getSongByID = async (song_id: string) => {
        try {
            const song = await prisma.song.findUnique({
                where: { song_id },
            });
            if (!song) {
                throw new CustomError(
                    "Song Does Not Exist",
                    HttpStatusCode.NOT_FOUND
                );
            }
            return song;
        } catch (error) {
            console.log(error);
            throw new CustomError(
                "Internal Server Error",
                HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    };

    public readonly toggleLike = async (
        song_id: string,
        action: { type: "increment" | "decrement" }
    ): Promise<boolean> => {
        try {
            // increment the like count
            await prisma.song.update({
                where: {
                    song_id,
                },
                data: {
                    likes_count: {
                        [action.type]: 1,
                    },
                },
            });
            return true;
        } catch (error) {
            return false;
        }
    };

    public readonly incrementPlayCount = async (
        song_id: string
    ): Promise<boolean> => {
        try {
            await prisma.song.update({
                where: {
                    song_id,
                },
                data: {
                    plays_count: {
                        increment: 1,
                    },
                },
            });
            return true;
        } catch (error) {
            throw new CustomError(
                "Internal Server Error",
                HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    };

    public readonly editSong = async (
        song_id: string,
        data: Partial<TEditableSong>
    ): Promise<SongDTO> => {
        try {
            const updatedSong = await prisma.song.update({
                where: {
                    song_id,
                },
                data,
            });
            return updatedSong;
        } catch (error) {
            throw new CustomError(
                "Internal Server Error",
                HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    };

    public readonly getAllSongs = () => {
        try {
            const songs = prisma.song.findMany({
                select: {
                    song_id: true,
                    upload_by: true,
                },
            });
            if(songs) return songs;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    public readonly deleteSong = () => {};

    public readonly setSongPrivacy = () => {};
}

export default SongRepository;
