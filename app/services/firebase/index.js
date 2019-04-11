import firebase from 'firebase/app';
import "firebase/firebase-database";
import config from './config';

let fbInstance;

function initializeFb(){
    return firebase.initializeApp(config);
}

export default function firebaseInstance(){
    if(!fbInstance){
        fbInstance = initializeFb();
    }

    return fbInstance;
}

