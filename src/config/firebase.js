// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";
import { signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration    
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYwGwflFcnz4tellt6MyEyKOoKEv0kXjk",
  authDomain: "gencerti-6163b.firebaseapp.com",
  projectId: "gencerti-6163b",
  storageBucket: "gencerti-6163b.appspot.com",
  messagingSenderId: "827162524276",
  appId: "1:827162524276:web:d70739ba0b8a797a5fef21",
  measurementId: "G-XJGQ072504"
};

const provider = new GoogleAuthProvider();
  
// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({   
    prompt : "select_account "
});
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
