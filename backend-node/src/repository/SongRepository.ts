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
            console.log("object");
            const song = await prisma.song.create({
                data: {
                    thumbnail: "",
                    privacy: "PRIVATE",
                    title: "",
                    description: "",
                    genre: "",
                    duration: "",
                    created_at: new Date(Date.now()).toISOString(),
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

    public readonly updateSong = async (song_id: string,data: Partial<EmptySong>) => {
        try {
            await prisma.song.update({
                where: {
                    song_id,
                },
                data
            });
        } catch (error) {
            console.log(error)
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
