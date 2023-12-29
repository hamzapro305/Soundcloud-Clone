import { Song } from "../@Types/Song";

class SongRepository {
    public readonly createSong = async (data: Song) => {
        try {
        } catch (error) {
            console.error("Error uploading song:", error);
        }
    };

    public readonly deleteSong = () => {};

    public readonly setSongPrivacy = () => {};
}

export default SongRepository;
