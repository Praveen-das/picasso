import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

export const firebaseConfig = {
  apiKey: "AIzaSyAvggda7w305l1aYmBZzw6jarnb-vh2JOc",
  authDomain: "ecommercewebsite-6a017.firebaseapp.com",
  projectId: "ecommercewebsite-6a017",
  storageBucket: "ecommercewebsite-6a017.appspot.com",
  messagingSenderId: "31846560668",
  appId: "1:31846560668:web:bc6df4695f1e27d218ce59"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
