import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import dotenv from "dotenv";

dotenv.config();

const envServiceAccount: ServiceAccount | null =
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
        ? {
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        }
        : null;

const fileServiceAccount = (() => {
    try {
        return require("./Service_Key.json");
    } catch (_err) {
        return null;
    }
})();

const serviceAccountToUse = (envServiceAccount || fileServiceAccount) as ServiceAccount;

if (!serviceAccountToUse) {
    throw new Error(
        "Firebase credentials not found. Set env vars or add Service_Key.json (but don't commit it)."
    );
}

initializeApp({
    credential: cert(serviceAccountToUse),
});


const db: Firestore = getFirestore();

export { db };