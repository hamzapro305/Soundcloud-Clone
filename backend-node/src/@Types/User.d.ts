export type User = {
    uid: string;
    email: string;
    password: string;
    facebook_id?: string; // these providers have multiple emails
    google_id?: string; // these providers have multiple emails
};

export type UserLocalSignUpDTO = {
    uid: string;
    email: string;
    password: string;
}

export type UserGoogleSignUpDTO = {
    uid: string;
    email: string;
    google_id: string;
}
export type UserFacebookSignUpDTO = {
    uid: string;
    email: string;
    google_id?: string;
}