import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  
  apiKey: "AIzaSyAFnspxFSWIffYwX0PHCM2EbQfU84mLHao",
  authDomain: "pizza-form-eec5b.firebaseapp.com",
  projectId: "pizza-form-eec5b",
  storageBucket: "pizza-form-eec5b.appspot.com",
  messagingSenderId: "98143127499",
  appId: "1:98143127499:web:e9c870188874574727584e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
