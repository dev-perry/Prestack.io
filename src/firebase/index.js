import * as firebase from "firebase/app";

import 'firebase/analytics';
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDeLznlQwoFKCpXCFQBp-B9Uvu3O6ETMw4",
    authDomain: "tozme-73fda.firebaseapp.com",
    databaseURL: "https://tozme-73fda.firebaseio.com",
    projectId: "tozme-73fda",
    storageBucket: "tozme-73fda.appspot.com",
    messagingSenderId: "449738637401",
    appId: "1:449738637401:web:d788da8da69889252a7148",
    measurementId: "G-QL07W33TZL"
};

firebase.initializeApp(firebaseConfig);
// firebase.functions().useFunctionsEmulator("http://localhost:5001");
firebase.analytics();

export default firebase;
