export type PossibleProviders = "facebook" | "google";
type GoogleProvider = {
    google_id: string;
    access_token: string;
    refresh_token?: string;
};
type FacebookProvider = {
    facebook_id: string;
    access_token: string;
    refresh_token?: string;
};

export type Provider = {
    google: GoogleProvider
    facebook: FacebookProvider
};