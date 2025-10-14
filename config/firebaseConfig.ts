import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import * as serviceAccount from "../Service_Key.json";

initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

export const db: Firestore = getFirestore();
