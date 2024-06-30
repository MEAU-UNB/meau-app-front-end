import { auth } from '../firebaseConfig';
import { signOut } from "firebase/auth";


const isUserAuthenticated = () => {
    const currentUser = auth.currentUser;
    return currentUser !== null; // Check for a logged-in user
  };

const signOutUser = () => signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });

export { isUserAuthenticated, signOutUser };