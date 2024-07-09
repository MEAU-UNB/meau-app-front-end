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

const getCurrentUser = () => {
  if (!isUserAuthenticated()) {
    throw new Error('No user currently signed in');
  } else {
    return auth.currentUser as any;
  };
}

export { isUserAuthenticated, getCurrentUser, signOutUser };