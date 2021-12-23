// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBe45xQg49vZtYqHSx-PlDUO4KXT3qVO8U",
  authDomain: "pokedex-5e5e5.firebaseapp.com",
  projectId: "pokedex-5e5e5",
  storageBucket: "pokedex-5e5e5.appspot.com",
  messagingSenderId: "715870636403",
  appId: "1:715870636403:web:34337000db36f128ef5d06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const google = new GoogleAuthProvider();

const facebook = new FacebookAuthProvider();

export{
  app,
  google,
  facebook
}