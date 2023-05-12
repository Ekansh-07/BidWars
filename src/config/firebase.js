import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCnf76ynjLLj-susuJCNmQjw5ojn59JAJ0",
    authDomain: "bid-wars-3c998.firebaseapp.com",
    projectId: "bid-wars-3c998",
    storageBucket: "bid-wars-3c998.appspot.com",
    messagingSenderId: "100067514590",
    appId: "1:100067514590:web:afbb010341a340c9d5ca4f"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);  
export const googleProvider = new GoogleAuthProvider(); 
export const storage = getStorage(app);
export const db = getFirestore(app); 
