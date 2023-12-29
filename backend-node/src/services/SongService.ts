import { inject, singleton } from "tsyringe";
import SongRepository from "../repository/SongRepository";

@singleton()
class SongService {
    constructor(
        @inject(SongRepository)
        private readonly _songRepository: SongRepository
    ) {}

    public readonly createSong = () => {

    };

    public readonly deleteSong = () => {};

    public readonly setSongPrivacy = () => {};
}

export default SongService;
