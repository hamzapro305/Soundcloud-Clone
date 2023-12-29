import { storage } from "../config/Firebase";

class ResumeAbleUpload {
    private readonly _bucket: ReturnType<typeof storage.bucket>;
    constructor() {
        this._bucket = storage.bucket();
    }
    public readonly uploadSong = async (req: any) => {
        
    };
}

export default ResumeAbleUpload;
