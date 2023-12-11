import admin from "firebase-admin"

import * as serviceAccount from '../utils/FirebaseServiceAccountInfo.json';


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    storageBucket: "gs://soundcloud-clone-3cbce.appspot.com" // Replace with your Firebase Storage bucket URL
});


const storage = admin.storage();

export {
    storage,
    admin,
}