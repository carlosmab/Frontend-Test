import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import firebaseConfig from "../config/firebase.config";

export default getFirestore(initializeApp(firebaseConfig));