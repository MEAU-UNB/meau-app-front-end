import { auth } from '../firebaseConfig';
import { signOut } from "firebase/auth";


const isUserAuthenticated = () => {
  const currentUser = auth.currentUser;
  return currentUser !== null; // Check for a logged-in user
};

const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log('User signed out successfully');
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

const getCurrentUser = () => {
  if (!isUserAuthenticated()) {
    throw new Error('No user currently signed in');
  } else {
    return auth.currentUser as any;
  };
}

export { isUserAuthenticated, getCurrentUser, signOutUser };

