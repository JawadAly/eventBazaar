import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQY-KkY-n0uBLiqfquJo6yGqgyvYxI2z4",
  authDomain: "event-bazaar-auth.firebaseapp.com",
  projectId: "event-bazaar-auth",
  storageBucket: "event-bazaar-auth.appspot.com",
  messagingSenderId: "891280500161",
  appId: "1:891280500161:web:3870046be8d7d64cfb3b40"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth,provider};

