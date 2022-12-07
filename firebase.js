import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyD4E25HeHEVDA6-3MDhZRYvxEC64PKeJGo",
    authDomain: "whatsapp-adc3b.firebaseapp.com",
    projectId: "whatsapp-adc3b",
    storageBucket: "whatsapp-adc3b.appspot.com",
    messagingSenderId: "104672633164",
    appId: "1:104672633164:web:8306cb73d20450c5ffefe9"
};

const firebaseApp = firebase.initializeApp(firebaseConfig); 

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();    

export {db, auth, provider};