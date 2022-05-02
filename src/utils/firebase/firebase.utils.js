// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgphmM1Lv2rozE3SlgoWjtP_DLxxc0Jig",
  authDomain: "crwn-v2-db.firebaseapp.com",
  projectId: "crwn-v2-db",
  storageBucket: "crwn-v2-db.appspot.com",
  messagingSenderId: "595883460567",
  appId: "1:595883460567:web:5a44218bcb29b98d696d92"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      setDoc(userDocRef, {displayName, email, createdAt});
    } catch(error) {
      console.error('error creating the user', error.message);
    }
  }

  return userDocRef;
}