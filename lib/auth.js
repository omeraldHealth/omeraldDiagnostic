import { createContext, useContext, useEffect, useState } from "react";
import firebase from "./firebase";
const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useFirebaseAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useFirebaseAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleUser = async (rawUser) => {
    if (rawUser) {
      // add db call
      //   createUser(user.uid, userWithoutToken);
      setUser(rawUser);
      console.log(rawUser);
      setLoading(false);
      return user;
    } else {
      setUser(false);
      setLoading(false);
      return false;
    }
  };

  const signInWithOtp = async (otp, redirect) => {
    let confirmationResult = window.confirmationResult;
    if (confirmationResult) {
      confirmationResult
        .confirm(Number(otp))
        .then((result) => {
          handleUser(result);
          //router.push(redirect)
        })
        .catch((error) => {
          console.error(error);
          return false;
        });
    }
  };

  const signout = async () => {
    await firebase.auth().signOut();
    return await handleUser(false);
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onIdTokenChanged(handleUser);
    return () => unsubscribe();
  }, []);

  /* TBA: some log in and log out function that will also call handleUser */

  return {
    user,
    loading,
    signInWithOtp,
    signout,
  };
}
