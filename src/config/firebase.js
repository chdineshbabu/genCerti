import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";
import { signOut } from "firebase/auth";
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

provider.setCustomParameters({   
    prompt : "select_account "
});
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
