import { useState, useEffect } from 'react';
import {
    getAuth, signInWithPopup, GoogleAuthProvider,
    onAuthStateChanged, signOut, getIdToken
} from "firebase/auth";
import initializeAuthentications from '../Firebase/Firebase/Firebase.init';

initializeAuthentications();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const signInUsingGoogle = () => {
        return signInWithPopup(auth, googleProvider)
        /* .then(result => {
            console.log(result.user);
        }) */
    }

    const logOut = () => {
        signOut(auth)
            .then(() => {
                setUser({})
            })
    }
    // observe whether user auth state changed or not
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                getIdToken(user)
                    .then(idToken => localStorage.setItem('idToken', idToken))
                setUser(user);
            }
        });
        return unsubscribe;
    }, [])

    return {
        user,
        signInUsingGoogle,
        logOut

    }
}

export default useFirebase;