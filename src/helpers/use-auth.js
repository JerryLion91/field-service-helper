import React from 'react';
import firebase from '../config/firebase';
import { useFirestore } from './use-firestore';

// DataBank
// import { useFirestore } from './use-firestore';

const authContext = React.createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return React.useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = React.useState(null);

  const firestore = useFirestore();

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signInWithGooglePopup = async (cb) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((response) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = response.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        // eslint-disable-next-line
        var token = credential.accessToken;
        // The signed-in user info.
        var user = response.user;
        // ...
        setUser(user);

        cb();
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);
        // The email of the user's account used.
        // eslint-disable-next-line
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        // eslint-disable-next-line
        const credential = error.credential;
        // ...
      });
  };

  const signInWithEmailAndPassword = async (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };

  const signup = async (email, password, username) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        const user = firebase.auth().currentUser;
        user
          .updateProfile({
            displayName: username,
          })
          .then(() => {
            // Update successful.
          })
          .catch((error) => {
            // An error happened.
          });
        user
          .sendEmailVerification()
          .then(() => {
            // Email sent.
          })
          .catch((error) => {
            // An error happened.
            console.log(error.code);
            console.log(error.message);
          });
        return response.user;
      });
  };

  const signout = async (cb) => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
        cb();
      });
  };

  const updateUserName = async (uid, userName) => {
    return firebase
      .auth()
      .currentUser.updateProfile({
        displayName: userName,
      })
      .then(() => {
        setUser(firebase.auth().currentUser);
      });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        firestore.createUser(user);
      } else {
        setUser(false);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [firestore]);

  // Return the user object and auth methods
  return {
    user,
    signInWithGooglePopup,
    signInWithEmailAndPassword,
    signup,
    signout,
    updateUserName,
  };
}
