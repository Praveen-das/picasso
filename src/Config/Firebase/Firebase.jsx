import { initializeApp } from "firebase/app";
import { CACHE_SIZE_UNLIMITED, initializeFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAvggda7w305l1aYmBZzw6jarnb-vh2JOc",
  authDomain: "ecommercewebsite-6a017.firebaseapp.com",
  projectId: "ecommercewebsite-6a017",
  storageBucket: "ecommercewebsite-6a017.appspot.com",
  messagingSenderId: "31846560668",
  appId: "1:31846560668:web:bc6df4695f1e27d218ce59"
};

const FirebaseApp = initializeApp(firebaseConfig);

export const db = initializeFirestore(FirebaseApp, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED
})
export const auth = getAuth(FirebaseApp)
export const storage = getStorage(FirebaseApp)