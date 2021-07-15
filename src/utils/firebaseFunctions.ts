import firebase from "firebase/app";

export const signOut = async (auth: firebase.auth.Auth) => await auth.signOut();
