import { TProfile } from "./Profile";
import { GoogleProvider } from "./Provider";
import { User } from "./User";

type UserProfile = {
    email: Pick<User, "email">;
    profile?: TProfile;
    google?: any;
    facebook?: any;
};