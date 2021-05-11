import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA6I0YZf7_PhvX3A1r4339e9vFInKBNjjg",
    authDomain: "signal-clone-b9f7e.firebaseapp.com",
    projectId: "signal-clone-b9f7e",
    storageBucket: "signal-clone-b9f7e.appspot.com",
    messagingSenderId: "63599872425",
    appId: "1:63599872425:web:2f3d7b106c231dd5109cb8"
};

let app;

if(firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export {db, auth};
