import { auth } from '../firebaseConfig';


const isUserAuthenticated = () => {
    const currentUser = auth.currentUser;
    return currentUser !== null; // Check for a logged-in user
  };

  export { isUserAuthenticated };