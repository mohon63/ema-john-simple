import { initializeApp } from "firebase/app";
import firebaseConfig from "../Firebase.config";

const initializeAuthentications = () => {
    initializeApp(firebaseConfig);
}

export default initializeAuthentications;